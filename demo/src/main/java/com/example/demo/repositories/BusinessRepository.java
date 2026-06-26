package com.example.demo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Business;

public interface BusinessRepository extends JpaRepository<Business, UUID> {
    
    @EntityGraph(value = "Business.detail", type = EntityGraphType.FETCH)
    @Query("SELECT b FROM Business b WHERE b.user.id = :userId")
    List<Business> getBusinesses(@Param("userId") UUID uid);

    boolean existsByUser_IdAndId(UUID userId, UUID businessId);

}
