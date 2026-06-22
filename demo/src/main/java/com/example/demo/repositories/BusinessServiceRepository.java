package com.example.demo.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.BusinessServices;

public interface BusinessServiceRepository extends JpaRepository<BusinessServices, UUID> {
    
} 
