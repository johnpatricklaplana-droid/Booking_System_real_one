package com.example.demo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.BusinessServices;
import com.example.demo.service.BusinessService;

public interface BusinessServiceRepository extends JpaRepository<BusinessServices, UUID> {

    List<BusinessServices> findByBusiness_Id(UUID businessId);
    
} 
