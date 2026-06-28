package com.example.demo.service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.SaveScheduleDto;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.Staff;
import com.example.demo.entity.Users;
import com.example.demo.enums.ScheduleStatus;
import com.example.demo.exceptions.InvalidInputsException;
import com.example.demo.repositories.BusinessServiceRepository;
import com.example.demo.repositories.ScheduleRepository;
import com.example.demo.repositories.StaffRepository;

import io.hypersistence.utils.hibernate.type.range.Range;
import jakarta.persistence.EntityManager;

@Service
public class ScheduleService {

    @Autowired
    ScheduleRepository scheduleRepo;
    
    @Autowired
    StaffRepository staffRepo;

    @Autowired 
    EntityManager entityManager;

    @Autowired
    BusinessServiceRepository businessServiceRepo;

    public void addSchedule(SaveScheduleDto scheduleDto, UUID userId) {
        
        boolean staffOffersService = staffRepo.existByStaffIdAndServiceId(scheduleDto.getStaffId(), scheduleDto.getServiceId());

        if(!staffOffersService) {
            throw new InvalidInputsException("super bad request");
        }

        BusinessServices services = businessServiceRepo.findById(scheduleDto.getServiceId()).orElse(null);

        String timezone = services.getBusiness().getTimezone();
        ZoneOffset timZoneOffset = ZoneId.of(timezone).getRules().getOffset(Instant.now());

        Duration duration = services.getDuration();

        if(!timZoneOffset.equals(ZonedDateTime.parse(scheduleDto.getStartsAt()).getOffset())) {
            throw new InvalidInputsException("super duper bad request");
        }

        Schedule schedule = new Schedule();
        schedule.setService(entityManager.getReference(BusinessServices.class, scheduleDto.getServiceId()));
        schedule.setStaff(entityManager.getReference(Staff.class, scheduleDto.getStaffId()));
        schedule.setStartsAt(ZonedDateTime.parse(scheduleDto.getStartsAt()));
        schedule.setStatus(ScheduleStatus.PENDING);
        schedule.setUser(entityManager.getReference(Users.class, userId));

        ZonedDateTime start = schedule.getStartsAt();
        ZonedDateTime end = start.plus(duration);

        schedule.setTimeRange(Range.closedOpen(start, end));

        scheduleRepo.save(schedule);

    }

}
