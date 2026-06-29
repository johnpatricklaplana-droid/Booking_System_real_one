package com.example.demo.service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BusinessDetailsDto;
import com.example.demo.dto.ServiceDetailsDto;
import com.example.demo.dto.ServicesDetailsDto;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Schedule;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.repositories.BusinessRepository;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.ScheduleRepository;

@Service
public class BusinessService {
    
    private final BusinessRepository businessRepo;
    private final BusinessMapper businessMapper;
    private final BusinessServiceRepository businessServiceRepo;
    private final ScheduleRepository scheduleRepo;

    public BusinessService(
        BusinessRepository businessRepository,
        BusinessMapper businessMapper,
        BusinessServiceRepository businessServiceRepo,
        ScheduleRepository scheduleRepo
    ) 
    {
        this.businessRepo = businessRepository;
        this.businessMapper = businessMapper;
        this.businessServiceRepo = businessServiceRepo;
        this.scheduleRepo = scheduleRepo;
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

    public List<ServicesDetailsDto> getServices() {
        
        return businessServiceRepo.findAllWithBusinessAndAddress().stream()
            .map(service -> businessMapper.toBusinessServices(service))
            .toList();

    }

    public ServiceDetailsDto getServiceDetails(UUID serviceId) {

        ServiceDetailsDto serviceDto = businessMapper.toServicesDetailsDto(businessServiceRepo.getServiceDetails(serviceId));

        if(serviceDto == null) {
            throw new InvalidInputsException("super bad request");
        }

        return serviceDto;

    }

}
