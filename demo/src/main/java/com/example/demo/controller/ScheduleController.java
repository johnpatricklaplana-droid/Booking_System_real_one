package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.SaveScheduleDto;
import com.example.demo.service.ScheduleService;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class ScheduleController {

    @Autowired
    ScheduleService scheduleService;
    
    @PostMapping("/api/schedule")
    public ResponseEntity<AuthResponse> addSchedule(
        @RequestBody SaveScheduleDto scheduleDto,
        @AuthenticationPrincipal UUID userId
    ) {
        scheduleService.addSchedule(scheduleDto, userId);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponse(201, "created one"));
    }
    

}
