package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.SaveScheduleDto;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.dto.response.BookingsDto;
import com.example.demo.dto.response.CustomerAppointmentDto;
import com.example.demo.enums.ScheduleStatus;
import com.example.demo.service.ScheduleService;

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

    @GetMapping("/api/schedule/business/{businessId}")
    @PreAuthorize("@businessOwnershipChecker.hasAccess(#businessId, #id)")
    public ResponseEntity<List<BookingsDto>> getBookings(
        @PathVariable UUID businessId,
        @AuthenticationPrincipal UUID id
    ) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(scheduleService.getBookings(businessId));
    }

    @GetMapping("/api/schedule")
    public ResponseEntity<List<CustomerAppointmentDto>> getMethodName(
        @AuthenticationPrincipal UUID uid
    ) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(scheduleService.getUserAppointments(uid));
    }
    
    @PatchMapping("/api/schedule/{scheduleId}/{status}")
    @PreAuthorize("@businessOwnershipChecker.hasAccessToConfirmBookings(#scheduleId, #uid)")
    public ResponseEntity<AuthResponse> confirmBooking(
        @PathVariable UUID scheduleId,
        @AuthenticationPrincipal UUID uid,
        @PathVariable ScheduleStatus status
    ) throws BadRequestException {

        scheduleService.updateBookingStatus(scheduleId, status);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new AuthResponse(200, "succesful one"));
    }
      
    public ResponseEntity<AuthResponse> cancelBooking() {
        
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(null);
    }

}
