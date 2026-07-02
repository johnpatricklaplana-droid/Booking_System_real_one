package com.example.demo.security;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.Staff;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.repositories.BusinessRepository;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.ScheduleRepository;
import com.example.demo.repositories.StaffRepository;

@Component("businessOwnershipChecker")
public class BusinessOwnershipCheck {
    
    @Autowired
    private BusinessRepository businessRepo;

    @Autowired 
    BusinessServiceRepository businessServiceRepo;

    @Autowired
    ScheduleRepository scheduleRepo;

    public boolean hasAccess(UUID businessId, UUID userId) {

        return businessRepo.findById(businessId)
            .map(business -> business.getUser().getId().equals(userId))
            .orElse(false);
    }

    public boolean hasAccess(UUID businessId, List<UUID> serviceId, UUID userId) {

        return
            businessRepo.existsByUser_IdAndId(userId, businessId)
            &&
            validateServicesBelongToBusiness(businessId, serviceId);
    }

    public boolean validateServicesBelongToBusiness(UUID businessId, List<UUID> serviceIds) {
        long foundCount = businessServiceRepo.countByBusiness_IdAndIdIn(businessId, serviceIds);
        return foundCount == serviceIds.size();
    }

    public boolean hasAccessToConfirmBookings(UUID scheduleId, UUID userId) {
        
        Schedule schedule = scheduleRepo.findById(scheduleId).orElse(null);

        if(schedule == null) {
            throw new InvalidInputsException("super bad requestt");
        }

        BusinessServices service = businessServiceRepo.findById(schedule.getService().getId()).orElse(null);

        return hasAccess(service.getBusiness().getId(), userId);
    }

}
