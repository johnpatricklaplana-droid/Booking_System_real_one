package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ServiceAvailabilityDto;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.dto.response.ServiceDetailsDto;
import com.example.demo.dto.response.ServiceWithBusinessDto;
import com.example.demo.dto.response.ServiceWithRatings;
import com.example.demo.dto.response.ServicesDetailsDto;
import com.example.demo.service.BusinessService;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class ServiceController {

    @Autowired
    BusinessService businessService;
    
    @GetMapping("/api/business/services/{businessId}")
    public ResponseEntity<List<ServiceWithRatings>> getBusinessServices(@PathVariable UUID businessId) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(businessService.getServices(businessId));
    }

    @GetMapping("/api/services")
    public ResponseEntity<List<ServiceWithBusinessDto>> getServices() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(businessService.getServices());
    }
        
    @GetMapping("/api/services/{serviceId}")
    public ResponseEntity<ServiceDetailsDto> getMethodName(@PathVariable UUID serviceId) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(businessService.getServiceDetails(serviceId));  

    }

    @PostMapping("/api/services/{serviceId}/{businessId}")
    @PreAuthorize("@businessOwnershipChecker.hasAccess(#businessId, T(java.util.List).of(#serviceId), #userId)")
    public ResponseEntity<AuthResponse> addSeviceAvailability(
        @PathVariable UUID serviceId,
        @PathVariable UUID businessId,
        @AuthenticationPrincipal UUID userId,
        @RequestBody ServiceAvailabilityDto availability
    ) {
        businessService.addServiceAvailability(serviceId, availability);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponse(201, "created one"));
    }
    
    

}
