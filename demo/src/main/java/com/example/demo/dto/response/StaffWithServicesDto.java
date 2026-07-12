package com.example.demo.dto.response;

import java.util.List;

public record StaffWithServicesDto(
    StaffResponseDto staff,
    List<ServicesDetailsDto> services
) {}
