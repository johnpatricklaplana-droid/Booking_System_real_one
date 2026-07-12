package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.request.AddStaffDto;
import com.example.demo.dto.request.AssignStaffToServiceDto;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.dto.response.StaffResponseDto;
import com.example.demo.dto.response.StaffWithServicesDto;
import com.example.demo.service.StaffService;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class StaffController {

    private final StaffService staffService;

    StaffController(StaffService staffService) {
        this.staffService = staffService;
    }
    
    @PostMapping("/api/staff")
    @PreAuthorize("@businessOwnershipChecker.hasAccess(#request.businessId, #request.serviceId, #id)")
    public ResponseEntity<AuthResponse> addStaff(
        @RequestPart("body") AddStaffDto request,
        @RequestPart("image") MultipartFile imageFile,
        @AuthenticationPrincipal UUID id
    ) {
        staffService.addNewStaff(request, imageFile, id);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponse(201, "new staff added super successfully"));
    }

    @PostMapping("/api/staff/business/{businessId}")
    @PreAuthorize("@businessOwnershipChecker.isThisStaffAndServiceYours(#businessId, #userId, #assignStaffToServiceDto.serviceId)")
    public ResponseEntity<AuthResponse> assignStaffToAService(
        @PathVariable UUID businessId,
        @AuthenticationPrincipal UUID userId,
        @RequestBody AssignStaffToServiceDto assignStaffToServiceDto
    ) {
        staffService.assignStaffToAService(assignStaffToServiceDto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponse(201, "created one"));
    }
    
    
    @GetMapping("/api/staff/{filename}")
    public ResponseEntity<byte[]> getStaffProfilePic(@PathVariable String filename, @AuthenticationPrincipal UUID uid) throws AccessDeniedException {
        String[] filenameAndUserId = filename.split("_");
        String originalFileName = filenameAndUserId[1];
        String userId = filenameAndUserId[0];

        if(!uid.toString().equals(userId)) {
            throw new AccessDeniedException("originalFileName");
        }

        byte[] fileStream = staffService.getStaffProfilePic(userId, originalFileName, "staff_logo");
        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaTypeFactory.getMediaType(originalFileName).orElse(MediaType.APPLICATION_OCTET_STREAM))
            .cacheControl(CacheControl.noStore())
            .body(fileStream);

    }

    @GetMapping("/api/staff/business/{businessId}")
    @PreAuthorize("@businessOwnershipChecker.hasAccess(#businessId, #id)")
    public ResponseEntity<List<StaffWithServicesDto>> getStaff(
        @PathVariable UUID businessId,
        @AuthenticationPrincipal UUID id
    ) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(staffService.getStaff(businessId));
    }

    @GetMapping("/api/staff/business/{businessId}/staff-only")
    @PreAuthorize("@businessOwnershipChecker.hasAccess(#businessId, #id)")
    public ResponseEntity<List<StaffResponseDto>> getMethodName(
        @PathVariable UUID businessId,
        @AuthenticationPrincipal UUID id
    ) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(staffService.getStaffOnly(businessId));
    }
    
}
