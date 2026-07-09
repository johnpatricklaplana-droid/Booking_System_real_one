package com.example.demo.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ServiceCategory;

public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, UUID> {
    
}
