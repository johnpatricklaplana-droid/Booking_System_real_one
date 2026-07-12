package com.example.demo.repositories.join_table;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.join_table.StaffServices;

public interface StaffServicesRepository extends JpaRepository<StaffServices, UUID> {
    
}
