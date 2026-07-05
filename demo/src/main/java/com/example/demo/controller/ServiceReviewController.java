package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.AddServicesReviewDto;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.service.ServiceReviewService;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class ServiceReviewController {
    
    @Autowired
    ServiceReviewService reviewService;

    @PostMapping("/api/review")
    @PreAuthorize("@scheduleCheck.isThisSchedYours(#review.scheduleId, #uid)")
    public ResponseEntity<AuthResponse> addReview(
        @RequestBody AddServicesReviewDto review,
        @AuthenticationPrincipal UUID uid
    ) {
        reviewService.addReview(review);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponse(201, "created one"));
    }
    

}
