package com.example.demo.service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.dto.request.ServiceAvailabilityDto;
import com.example.demo.dto.response.BusinessDetailsDto;
import com.example.demo.dto.response.BusinessTotalsDto;
import com.example.demo.dto.response.CustomerSummary;
import com.example.demo.dto.response.FullAnalyticsResponse;
import com.example.demo.dto.response.MonthlyStatsDto;
import com.example.demo.dto.response.PeakHourDto;
import com.example.demo.dto.response.ServiceDetailsDto;
import com.example.demo.dto.response.ServiceDistributionDto;
import com.example.demo.dto.response.ServiceReviewDto;
import com.example.demo.dto.response.ServiceWithBusinessDto;
import com.example.demo.dto.response.ServiceWithRatings;
import com.example.demo.dto.response.ServicesDetailsDto;
import com.example.demo.dto.response.StaffResponseDto;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.ServiceReviews;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.mapper.BusinessMapper;
import com.example.demo.mapper.ServiceMapper;
import com.example.demo.mapper.ServiceReviewMapper;
import com.example.demo.repositories.BusinessRepository;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.ScheduleRepository;
import com.example.demo.repositories.ServiceAvailabilityRepository;

@Service
public class BusinessService {
    
    private final BusinessRepository businessRepo;
    private final BusinessMapper businessMapper;
    private final BusinessServiceRepository businessServiceRepo;
    private final ScheduleRepository scheduleRepo;
    private final ServiceReviewMapper serviceReviewMapper;
    private final ServiceAvailabilityRepository serviceAvailabilityRepo;
    private final ServiceMapper serviceMapper;

    public BusinessService(
        BusinessRepository businessRepository,
        BusinessMapper businessMapper,
        BusinessServiceRepository businessServiceRepo,
        ScheduleRepository scheduleRepo,
        ServiceReviewMapper serviceReviewMapper,
        ServiceAvailabilityRepository serviceAvailabilityRepo,
        ServiceMapper serviceMapper
    ) 
    {
        this.businessRepo = businessRepository;
        this.businessMapper = businessMapper;
        this.businessServiceRepo = businessServiceRepo;
        this.scheduleRepo = scheduleRepo;
        this.serviceReviewMapper = serviceReviewMapper;
        this.serviceAvailabilityRepo = serviceAvailabilityRepo;
        this.serviceMapper = serviceMapper;
    }

    public List<BusinessDetailsDto> getBusinesses(UUID uid) {
        
        return businessRepo.getBusinesses(uid).stream()
            .map(b -> businessMapper.toBusinessDetailsDto(b))
            .toList();
        
    }

    public List<ServiceWithRatings> getServices(UUID businessId) {
        
        List<BusinessServices> services = businessServiceRepo.findByBusiness_Id(businessId);

        return services.stream()
            .map(s -> {
                ServicesDetailsDto service = businessMapper.toBusinessServices(s);
                List<ServiceReviewDto> review = s.getReviews().stream()
                    .map(rev -> serviceReviewMapper.toServiceReviewDto(rev))
                    .toList();
                return new ServiceWithRatings(review, service);
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
        Double averageRating = businessRepo.getAverageRating(businessId);
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

}
