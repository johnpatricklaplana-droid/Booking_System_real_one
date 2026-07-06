package com.example.demo.dto.response;

public record CustomerAppointmentDto(
    ServicesDetailsDto service,
    StaffResponseDto staff,
    ScheduleDto schedule,
    BusinessDetailsDto business,
    boolean isAlreadyRatedByYou,
    ServiceReviewDto review
) {}
