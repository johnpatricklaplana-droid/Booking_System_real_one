package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.BusinessDetailsDto;
import com.example.demo.entity.Business;
import com.example.demo.service.BusinessService;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;

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
    

}
