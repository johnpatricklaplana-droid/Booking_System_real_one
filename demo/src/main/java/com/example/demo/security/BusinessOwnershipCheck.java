package com.example.demo.security;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Schedule;
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

    @Autowired
    StaffRepository staffRepo;

    public boolean hasAccess(UUID businessId, UUID userId) {

        return businessRepo.existsByUser_IdAndId(userId, businessId);
    }

    public boolean hasAccess(UUID businessId, List<UUID> serviceId, UUID userId) {
        return
            hasAccess(businessId, userId)
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

    public boolean isThisStaffAndServiceYours(UUID businessId, UUID userId, UUID serviceId) {
        if(!staffRepo.existsByBusiness_Id(businessId)) {
            return false;
        }

        return hasAccess(businessId, userId)
            && validateServicesBelongToBusiness(businessId, List.of(serviceId));

    }

}
