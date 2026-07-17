package com.example.demo.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.ServiceAvailabilityDto;
import com.example.demo.dto.response.BusinessDetailsDto;
import com.example.demo.dto.response.BusinessTotalsDto;
import com.example.demo.dto.response.CancellationRequestDto;
import com.example.demo.dto.response.CancellationRequestMiniDto;
import com.example.demo.dto.response.CustomerSummary;
import com.example.demo.dto.response.FullAnalyticsResponse;
import com.example.demo.dto.response.MonthlyStatsDto;
import com.example.demo.dto.response.PeakHourDto;
import com.example.demo.dto.response.ScheduleDto;
import com.example.demo.dto.response.ServiceDetailsDto;
import com.example.demo.dto.response.ServiceDistributionDto;
import com.example.demo.dto.response.ServiceReviewDto;
import com.example.demo.dto.response.ServiceWithBusinessDto;
import com.example.demo.dto.response.ServicesDetailsDto;
import com.example.demo.dto.response.StaffResponseDto;
import com.example.demo.dto.response.UserDtoPublic;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.CancellationRequest;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.ServiceAvailability;
import com.example.demo.enums.CancellationRequestStatus;
import com.example.demo.enums.ScheduleStatusForCustomerUpdate;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.mapper.ServiceMapper;
import com.example.demo.mapper.ServiceReviewMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repositories.BusinessRepository;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.CancellationRequestRepository;
import com.example.demo.repositories.ScheduleRepository;
import com.example.demo.repositories.ServiceAvailabilityRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class BusinessService {
    
    private final BusinessRepository businessRepo;
    private final BusinessMapper businessMapper;
    private final BusinessServiceRepository businessServiceRepo;
    private final ScheduleRepository scheduleRepo;
    private final ServiceReviewMapper serviceReviewMapper;
    private final ServiceAvailabilityRepository serviceAvailabilityRepo;
    private final ServiceMapper serviceMapper;
    private final EntityManager entityManager;
    private final UserMapper userMapper;
    private final CancellationRequestRepository cancellationRequestRepo;

    public BusinessService(
        BusinessRepository businessRepository,
        BusinessMapper businessMapper,
        BusinessServiceRepository businessServiceRepo,
        ScheduleRepository scheduleRepo,
        ServiceReviewMapper serviceReviewMapper,
        ServiceAvailabilityRepository serviceAvailabilityRepo,
        ServiceMapper serviceMapper,
        EntityManager entityManager,
        UserMapper userMapper,
        CancellationRequestRepository cancellationRequestRepo
    ) 
    {
        this.businessRepo = businessRepository;
        this.businessMapper = businessMapper;
        this.businessServiceRepo = businessServiceRepo;
        this.scheduleRepo = scheduleRepo;
        this.serviceReviewMapper = serviceReviewMapper;
        this.serviceAvailabilityRepo = serviceAvailabilityRepo;
        this.serviceMapper = serviceMapper;
        this.entityManager = entityManager;
        this.userMapper = userMapper;
        this.cancellationRequestRepo = cancellationRequestRepo;
    }

    public List<BusinessDetailsDto> getBusinesses(UUID uid) {
        
        return businessRepo.getBusinesses(uid).stream()
            .map(b -> businessMapper.toBusinessDetailsDto(b))
            .toList();
        
    }

    public List<ServiceWithBusinessDto> getServices(UUID businessId) {
        
        List<BusinessServices> services = businessServiceRepo.findByBusiness_Id(businessId);

        return services.stream()
            .map(s -> {
                ServicesDetailsDto service = businessMapper.toBusinessServices(s);
                BusinessDetailsDto business = businessMapper.toBusinessDetailsDto(s.getBusiness());
                List<ServiceReviewDto> review = s.getReviews().stream()
                    .map(rev -> serviceReviewMapper.toServiceReviewDto(rev))
                    .toList();
                return new ServiceWithBusinessDto(service, business ,review);
            })
            .toList();

    }

    public List<ServiceWithBusinessDto> getServices() {
        
        return businessServiceRepo.findAllWithBusinessAndAddress().stream()
            .map(service -> {
                ServicesDetailsDto services = businessMapper.toBusinessServices(service);
                BusinessDetailsDto business = businessMapper.toBusinessDetailsDto(service.getBusiness());
                List<ServiceReviewDto> review = service.getReviews().stream()
                    .map(serviceReviewMapper::toServiceReviewDto)
                    .toList();
                return new ServiceWithBusinessDto(services, business, review);
            })
            .toList();

    }

    public ServiceDetailsDto getServiceDetails(UUID serviceId) {

        BusinessServices businessServices = businessServiceRepo.getServiceDetails(serviceId);

        if (businessServices == null) {
            throw new InvalidInputsException("super bad request");
        }

        BusinessDetailsDto business = businessMapper.toBusinessDetailsDto(businessServices.getBusiness());
        ServicesDetailsDto services = businessMapper.toBusinessServices(businessServices);
        List<StaffResponseDto> staff = businessServices.getStaffs().stream()
            .map(businessMapper::toStaffResponseDto)
            .toList();
        List<ServiceAvailabilityDto> serviceAvailability = serviceAvailabilityRepo.findByServicesId(businessServices.getId()).stream()
            .map(serviceMapper::toServiceAvailabilityDto)
            .toList();

        return new ServiceDetailsDto(business, services, staff, serviceAvailability);

    }

    public List<CustomerSummary> getCustomer(UUID businessId) {

        return scheduleRepo.findCustomersByBusinessId(businessId);

    }

    public FullAnalyticsResponse getBusinessAnalysis(UUID businessId, int year) {
        
        BusinessTotalsDto businessTotals = businessRepo.getBussinessAnalytics(businessId);
        List<MonthlyStatsDto> monthlyStats = businessRepo.getMonthlyBreakdown(businessId, year);
        BigDecimal averageRating = businessRepo.getAverageRating(businessId);
        List<ServiceDistributionDto> serviceDistribution = businessRepo.getServiceDestribution(businessId);
        List<PeakHourDto> peakHour = businessRepo.getPeakHours(businessId);

        return new FullAnalyticsResponse(
            businessTotals, 
            monthlyStats, 
            averageRating, 
            serviceDistribution, 
            peakHour
        );

    }

    public void addServiceAvailability(UUID serviceId, ServiceAvailabilityDto availability) {

        ServiceAvailability serviceAvailability = serviceMapper.toServiceAvailability(availability);
        serviceAvailability.setServices(entityManager.getReference(BusinessServices.class, serviceId));

        serviceAvailabilityRepo.save(serviceAvailability);

    }

    public List<CancellationRequestDto> getCancellationRequest(UUID businessId) {
        
        List<UUID> serviceIds = businessServiceRepo.findByBusiness_Id(businessId).stream().map(s -> s.getId()).toList();

        return scheduleRepo.getCancellationRequest(serviceIds).stream()
            .map(s -> {
                ServicesDetailsDto service = businessMapper.toBusinessServices(s.getService());
                StaffResponseDto staff = businessMapper.toStaffResponseDto(s.getStaff());
                ScheduleDto schedule = businessMapper.toScheduleDto(s);
                UserDtoPublic user = userMapper.toUserDtoPublic(s.getUser());
                CancellationRequestMiniDto cancellationRequest = businessMapper.toCancellationRequestMiniDto(s.getCancellationRequests());
                return new CancellationRequestDto(service, staff, schedule, user, cancellationRequest);
            })
            .toList();

    }

    @Transactional
    public void approveCancellationRequest(UUID cancellationRequestId) {
        
        CancellationRequest cr = cancellationRequestRepo.findById(cancellationRequestId).orElse(null);
        cr.setStatus(CancellationRequestStatus.APPROVED.toString());

        Schedule schedule = scheduleRepo.findById(cr.getSchedule().getId()).orElse(null);
        schedule.setStatus(ScheduleStatusForCustomerUpdate.CANCELLED.toString());

        scheduleRepo.save(schedule);
        cancellationRequestRepo.save(cr);
        
    }

    

}
