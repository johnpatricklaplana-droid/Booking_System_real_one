package com.example.demo.security;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.repositories.BusinessRepository;

@Component("businessOwnershipChecker")
public class BusinessOwnershipCheck {
    
    @Autowired
    private BusinessRepository businessRepo;

    public boolean hasAccess(UUID businessId, String userId) {

        return businessRepo.findById(businessId)
            .map(business -> business.getUserId().toString().equals(userId))
            .orElse(false);
    }

}
