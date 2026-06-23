package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BusinessDetailsDto;
import com.example.demo.repositories.BusinessMapper;
import com.example.demo.repositories.BusinessRepository;

@Service
public class BusinessService {
    
    private final BusinessRepository businessRepo;
    private final BusinessMapper businessMapper;

    public BusinessService(BusinessRepository businessRepository,
            BusinessMapper businessMapper) {
        this.businessRepo = businessRepository;
        this.businessMapper = businessMapper;
    }

    public List<BusinessDetailsDto> getBusinesses(UUID uid) {
        
        return businessRepo.getBusinesses(uid).stream()
            .map(b -> businessMapper.toBusinessDetailsDto(b))
            .toList();
        
    }

}
