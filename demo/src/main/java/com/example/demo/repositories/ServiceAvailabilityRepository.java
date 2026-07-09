package com.example.demo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ServiceAvailability;

public interface ServiceAvailabilityRepository extends JpaRepository<ServiceAvailability, UUID> {

    List<ServiceAvailability> findByServicesId(UUID id);
    
}
