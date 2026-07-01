package com.example.demo.dto.response;

public record BookingsDto(
    ServicesDetailsDto service, 
    StaffResponseDto staff, 
    ScheduleDto schedule,
    UserDtoPublic user
) {}
