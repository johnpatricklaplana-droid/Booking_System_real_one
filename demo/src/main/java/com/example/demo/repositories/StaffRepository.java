package com.example.demo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, UUID> {

    @EntityGraph(value = "staffWithServices", type = EntityGraphType.FETCH)
    @Query("SELECT s FROM Staff s WHERE s.business.id = :businessId")
    List<Staff> getStaffs(UUID businessId);
    
}
