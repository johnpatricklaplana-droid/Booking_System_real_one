package com.example.demo.security;

import java.nio.file.AccessDeniedException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Schedule;
import com.example.demo.enums.ScheduleStatus;
import com.example.demo.repositories.ScheduleRepository;

@Component("scheduleCheck")
public class ScheduleCheck {

    @Autowired
    ScheduleRepository schedRepo;
    
    public boolean isThisSchedYours(UUID scheduleId, UUID userId) throws AccessDeniedException {

        Schedule schedule = schedRepo.findById(scheduleId).orElse(null);

        if(schedule == null) {
            throw new AccessDeniedException("bad one");
        }

        if(!schedule.getStatus().equals(ScheduleStatus.COMPLETED.toString())) {
            return false;
        }

        return schedule.getUser().getId().equals(userId);
    }

}
