package com.example.demo.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.response.BusinessDetailsDto;
import com.example.demo.dto.response.CustomerSummary;
import com.example.demo.service.BusinessService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class BusinessController {

    @Autowired
    BusinessService businessService;
    
    @GetMapping("/api/business")
    public ResponseEntity<List<BusinessDetailsDto>> getBusinesses(@AuthenticationPrincipal UUID uid) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(businessService.getBusinesses(uid));
    }

    @GetMapping("/api/business/customer/{businessId}")
    @PreAuthorize("@businessOwnershipChecker.hasAccess(#businessId, #id)")
    public ResponseEntity<List<CustomerSummary>> getMethodName(
        @PathVariable UUID businessId,
        @AuthenticationPrincipal UUID id
    ) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(businessService.getCustomer(businessId));
    }

}
