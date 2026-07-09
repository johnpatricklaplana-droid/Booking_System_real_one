package com.example.demo.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ServiceAvailability;

public interface ServiceAvailabilityRepository extends JpaRepository<ServiceAvailability, UUID> {
    
}
