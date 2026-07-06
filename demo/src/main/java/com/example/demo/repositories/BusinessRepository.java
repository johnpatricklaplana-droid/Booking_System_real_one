package com.example.demo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.response.BusinessTotalsDto;
import com.example.demo.dto.response.MonthlyStatsDto;
import com.example.demo.entity.Business;

public interface BusinessRepository extends JpaRepository<Business, UUID> {
    
    @EntityGraph(value = "Business.detail", type = EntityGraphType.FETCH)
    @Query("SELECT b FROM Business b WHERE b.user.id = :userId")
    List<Business> getBusinesses(@Param("userId") UUID uid);

    boolean existsByUser_IdAndId(UUID userId, UUID businessId);

    @Query("""
        SELECT new com.example.demo.dto.response.BusinessTotalsDto(
            SUM(s.service.price),
            COUNT(s),
            COUNT(DISTINCT s.user)
        )
        FROM Schedule s
        WHERE s.service.business.id = :businessId 
        AND s.status = 'COMPLETED'
    """)
    BusinessTotalsDto getBussinessAnalytics(@Param("businessId") UUID businessId);

    @Query("""
        SELECT new com.example.demo.dto.response.MonthlyStatsDto(
            CAST(FUNCTION('date_trunc', 'month', s.startsAt) AS java.time.LocalDateTime),
            SUM(s.service.price),
            COUNT(s)
        )
        FROM Schedule s 
        WHERE s.service.business.id = :businessId AND s.status = 'COMPLETED'
        GROUP BY FUNCTION('date_trunc', 'month', s.startsAt)
        ORDER BY FUNCTION('date_trunc', 'month', s.startsAt)
    """)
    List<MonthlyStatsDto> getMonthlyBreakdown(@Param("businessId") UUID businessId);

}
