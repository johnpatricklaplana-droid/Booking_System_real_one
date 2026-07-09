package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.dto.request.AddServiceRequestDto;
import com.example.demo.dto.request.CreateBusinessRequestDto;
import com.example.demo.dto.request.SearchAddressDto;
import com.example.demo.dto.request.UserCredentialsSignUp;
import com.example.demo.dto.response.AddressDto;
import com.example.demo.dto.response.NominatimRawResponse;
import com.example.demo.dto.response.UserDto;
import com.example.demo.entity.Address;
import com.example.demo.entity.Business;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Roles;
import com.example.demo.entity.ServiceAvailability;
import com.example.demo.entity.ServiceCategory;
import com.example.demo.entity.Users;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UserAlreadyExistsException;
import com.example.demo.helper.UserHelper;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.mapper.ServiceMapper;
import com.example.demo.repositories.BusinessRepository;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.UserRepository;

import jakarta.persistence.EntityManager;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    BusinessRepository businessRepo;

    @Autowired
    private SupabaseStorageService supabaseStorageService;

    private final WebClient webClient;

    public UserService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    @Autowired
    EmailVerifications emailVerifications;

    @Autowired
    UserHelper userHelper;

    @Autowired
    BusinessServiceRepository businessServiceRepo;

    @Autowired
    EntityManager entityManager;

    @Autowired
    BusinessMapper businessMapper;

    @Autowired
    ServiceMapper serviceMapper;
    
    public void createUser (UserCredentialsSignUp body) {   

        Users user = new Users();
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setEmail(body.getEmail());
        user.setFirebaseUid(body.getFirebase_uid());
        user.setFirstName(body.getFirst_name());
        user.setLastName(body.getLast_name());

        List<Roles> roles = new ArrayList<>();
        Roles r = new Roles();
        r.setCratedAt(LocalDateTime.now());
        r.setRole("CUSTOMER");
        r.setUserId(user);
        roles.add(r);
        user.setRoles(roles);

        userRepo.save(user);

    }

    public Users getUser (String uid) {

        Users user = userRepo.findByFirebaseUid(uid);
        
        return user;

    }

    public String uploadUserProfile(MultipartFile file) {

        String id = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UUID userId = UUID.fromString(id);
        
        Users user = userRepo.findById(userId).orElse(null);
        String url = supabaseStorageService.uploadProfilePic(file, user.getAvatarUrl());

        try {

            user.setAvatarUrl(url);

            userRepo.save(user);

            return url;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public UserDto getUser (UUID uid) {

        Users user = userRepo.findById(uid).orElse(null);

        UserDto dto = new UserDto();
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRoles(user.getRoles().stream().map(r -> r.getRole()).toList());
        dto.setLastActiveRole(user.getLastActiveRole());
        dto.setLastBusinessIdImViewing(user.getLastBusinessIdImViewing());
        
        return dto;

    }

    public void createBusiness(CreateBusinessRequestDto businessDto, MultipartFile businessLogo, UUID uid) {

        boolean isEmailValid = emailVerifications.isEmailValid(businessDto.getBusinessEmail());

        if(!isEmailValid) {
            throw new InvalidInputsException("Invalid email address");
        }

        SearchAddressDto addressDto = businessDto.getAddress();

        String url = "https://nominatim.openstreetmap.org/search?limit=1&postalcode=" 
            + addressDto.getPostalCode() 
            + "&country=" + addressDto.getCountry() 
            + "&state=" + addressDto.getProvince() 
            + "&city=" + addressDto.getCity() 
            + "&format=jsonv2&addressdetails=1";

        SearchAddressDto address = searchAddress(url)
            .map(add -> add.isEmpty() ? null : add.get(0))
            .block();
  
        if(address == null) {
            throw new ResourceNotFoundException("We couldn't find this address. Please check your postal code, city, or province.");
        }

        createBusinessTransAction(address, businessDto, businessLogo, uid);

    }

    @Transactional
    void createBusinessTransAction (
        SearchAddressDto address, 
        CreateBusinessRequestDto businessDto, 
        MultipartFile businessLogo,
        UUID uid) {

        Users user = userRepo.findById(uid).orElse(null);

        List<Roles> roles = new ArrayList<>();
        Roles r = new Roles();
        r.setCratedAt(LocalDateTime.now());
        r.setRole("BUSINESS_OWNER");
        r.setUserId(user);
        roles.add(r);

        Address addressRealDeal = new Address();
        addressRealDeal.setCity(address.getCity() == null ? businessDto.getAddress().getCity() : address.getCity());
        addressRealDeal.setCountry(address.getCountry() == null ? businessDto.getAddress().getCountry() : address.getCountry());
        addressRealDeal.setCountryCode(address.getCountryCode());
        addressRealDeal.setDisplayName(address.getDisplayName());
        addressRealDeal.setLat(address.getLat());
        addressRealDeal.setLon(address.getLon());
        addressRealDeal.setPostalCode(address.getPostalCode() == null ? businessDto.getAddress().getPostalCode() : address.getPostalCode());
        addressRealDeal.setProvince(address.getProvince() == null ? businessDto.getAddress().getProvince() : address.getProvince());
        addressRealDeal.setRoad(address.getRoad() == null ? businessDto.getAddress().getRoad() : address.getRoad());
        addressRealDeal.setTimezone(address.getTimezone());

        Business buss = new Business();
        buss.setAddress(addressRealDeal);
        buss.setBusinessEmail(businessDto.getBusinessEmail());
        buss.setBusinessName(businessDto.getBusinessName());
        buss.setFacebookPage(businessDto.getFacebookPage());
        buss.setBusinessType(businessDto.getBusinessType());
        buss.setCreatedAt(LocalDateTime.now());
        buss.setDescription(businessDto.getDescription());
        buss.setStatus("ACTIVE");
        buss.setTimezone(businessDto.getAddress().getTimezone());
        buss.setUser(user);
        buss.setLogoUrl(supabaseStorageService.uploadBusinessLogo(businessLogo, "business_logo"));

        businessRepo.save(buss);

        user.setRoles(roles);
        user.setLastBusinessIdImViewing(buss.getId());

        userRepo.save(user);

    }

    public Mono<List<SearchAddressDto>> searchAddress(String url) {
        return webClient
            .get()
            .uri(url)
            .header(HttpHeaders.USER_AGENT, "booking-super-system")
            .retrieve()
            .bodyToFlux(NominatimRawResponse.class)
            .collectList()
            .flatMapMany(Flux::fromIterable)
            .map(raw -> userHelper.toSearchAddressDto(raw))
            .collectList();
    }

    public void updateLastActiveRoleToBusiness(UUID uid, String role) {
        
        Users user = userRepo.findById(uid).orElse(null);

        if(user == null) {
            throw new ResourceNotFoundException("user not found");
        }

        user.setLastActiveRole(role);
        userRepo.save(user);

    }

    @Transactional
    public void addBusinessServices(AddServiceRequestDto request, MultipartFile file) throws BadRequestException {
        
        if (businessServiceRepo.existsByBusiness_IdAndServiceNameIgnoreCase(
                request.getBusinessId(),
                request.getServiceName())) {

            throw new UserAlreadyExistsException("service already exist");
        }

        if(file.isEmpty()) {
            throw new BadRequestException("service image is required buddy");
        }

        if(!file.getContentType().startsWith("image/")) {
            throw new BadRequestException("invalid image type buddy");
        }

        BusinessServices businessServices = businessMapper.toSaveBusinessServices(request, entityManager);

        businessServices.setServiceLogoUrl(supabaseStorageService.uploadBusinessLogo(file, "business_service_logo"));

        List<ServiceCategory> categories = request.getCategories().stream()
            .map(cat -> {
                ServiceCategory category = serviceMapper.toServiceCategory(cat);
                category.setServices(businessServices);
                return category;
            })
            .toList();
        List<ServiceAvailability> availabilities = request.getAvailability().stream()
            .map(avail -> {
                ServiceAvailability availability = serviceMapper.toServiceAvailability(avail);
                availability.setServices(businessServices);
                return availability;
            })
            .toList();

        businessServices.setAvailabilities(availabilities);
        businessServices.setCategories(categories);

        businessServiceRepo.save(businessServices);
        
    }

    public void switchBusiness(UUID businessId, UUID userId) {
        
        Users user = userRepo.findById(userId).orElse(null);
        user.setLastBusinessIdImViewing(businessId);

        try {
            userRepo.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
