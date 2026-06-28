package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ServiceDetailsDto;
import com.example.demo.dto.ServicesDetailsDto;
import com.example.demo.service.BusinessService;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class ServiceController {

    @Autowired
    BusinessService businessService;
    
    @GetMapping("/api/business/services/{businessId}")
    public ResponseEntity<List<ServicesDetailsDto>> getBusinessServices(@PathVariable UUID businessId) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(businessService.getServices(businessId));
    }

    @GetMapping("/api/services")
    public ResponseEntity<List<ServicesDetailsDto>> getServices() {
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
    

}
