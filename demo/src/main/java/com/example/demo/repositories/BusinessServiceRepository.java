package com.example.demo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.BusinessServices;

public interface BusinessServiceRepository extends JpaRepository<BusinessServices, UUID> {

    List<BusinessServices> findByBusiness_Id(UUID businessId);

    long countByBusiness_IdAndIdIn(UUID businessId, List<UUID> serviceId);

    @EntityGraph("BusinessServices.withBusinessAndAddress")
    @Query("SELECT bs FROM BusinessServices bs")
    List<BusinessServices> findAllWithBusinessAndAddress();

    @EntityGraph("ServiceDetails")
    @Query("SELECT s FROM BusinessServices s WHERE s.id = :serviceId")
    BusinessServices getServiceDetails(@Param("serviceId") UUID serviceId);
    
} 
