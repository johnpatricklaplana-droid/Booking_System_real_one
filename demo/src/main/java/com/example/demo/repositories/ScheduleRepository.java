package com.example.demo.repositories;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, UUID> {
    
    @Query("SELECT s FROM Schedule s WHERE s.service.id = :serviceId AND s.startsAt >= :now AND s.status != 'CANCELLED'")
    List<Schedule> findUpcomingByServiceId(@Param("serviceId") UUID serviceId, @Param("now") ZonedDateTime now);

    @EntityGraph("schedule.staff.service")
    @Query("SELECT s FROM Schedule s WHERE s.service.id IN :serviceIds")
    List<Schedule> getBookings(@Param("serviceIds") List<UUID> serviceIds);

}
