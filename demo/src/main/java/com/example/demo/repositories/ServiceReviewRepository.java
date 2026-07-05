package com.example.demo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.ServiceReviews;

public interface ServiceReviewRepository extends JpaRepository<ServiceReviews, UUID> {

    @EntityGraph("reviewsWithUser")
    @Query("SELECT sr FROM ServiceReviews sr WHERE sr.services.id = :serviceId")
    List<ServiceReviews> getReviews(@Param("serviceId") UUID serviceId);

}
