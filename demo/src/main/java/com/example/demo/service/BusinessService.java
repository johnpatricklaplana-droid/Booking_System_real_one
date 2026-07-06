package com.example.demo.service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.dto.response.BusinessDetailsDto;
import com.example.demo.dto.response.ServiceDetailsDto;
import com.example.demo.dto.response.ServiceReviewDto;
import com.example.demo.dto.response.ServiceWithBusinessDto;
import com.example.demo.dto.response.ServicesDetailsDto;
import com.example.demo.dto.response.StaffResponseDto;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.ServiceReviews;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.mapper.ServiceReviewMapper;
import com.example.demo.repositories.BusinessRepository;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.ScheduleRepository;

@Service
public class BusinessService {
    
    private final BusinessRepository businessRepo;
    private final BusinessMapper businessMapper;
    private final BusinessServiceRepository businessServiceRepo;
    private final ScheduleRepository scheduleRepo;
    private final ServiceReviewMapper serviceReviewMapper;

    public BusinessService(
        BusinessRepository businessRepository,
        BusinessMapper businessMapper,
        BusinessServiceRepository businessServiceRepo,
        ScheduleRepository scheduleRepo,
        ServiceReviewMapper serviceReviewMapper
    ) 
    {
        this.businessRepo = businessRepository;
        this.businessMapper = businessMapper;
        this.businessServiceRepo = businessServiceRepo;
        this.scheduleRepo = scheduleRepo;
        this.serviceReviewMapper = serviceReviewMapper;
    }

    public List<BusinessDetailsDto> getBusinesses(UUID uid) {
        
        return businessRepo.getBusinesses(uid).stream()
            .map(b -> businessMapper.toBusinessDetailsDto(b))
            .toList();
        
    }

    public List<ServicesDetailsDto> getServices(UUID businessId) {
        
        List<BusinessServices> services = businessServiceRepo.findByBusiness_Id(businessId);

        return services.stream()
            .map(s -> businessMapper.toBusinessServices(s))
            .toList();

    }

    public List<ServiceWithBusinessDto> getServices() {
        
        return businessServiceRepo.findAllWithBusinessAndAddress().stream()
            .map(service -> {
                ServicesDetailsDto services = businessMapper.toBusinessServices(service);
                BusinessDetailsDto business = businessMapper.toBusinessDetailsDto(service.getBusiness());
                return new ServiceWithBusinessDto(services, business);
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
            .map(s -> businessMapper.toStaffResponseDto(s))
            .toList();

        return new ServiceDetailsDto(business, services, staff);

    }

}
