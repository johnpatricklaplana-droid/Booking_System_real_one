package com.example.demo.dto.response;

import java.util.List;

import com.example.demo.dto.request.ServiceAvailabilityDto;

public record ServiceDetailsDto(
    BusinessDetailsDto business, 
    ServicesDetailsDto services, 
    List<StaffResponseDto> staff,
    List<ServiceAvailabilityDto> serviceAvailability
) {}  

