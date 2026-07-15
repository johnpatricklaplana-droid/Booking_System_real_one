package com.example.demo.dto.response;

public record CancellationRequestDto (
    ServicesDetailsDto service,
    StaffResponseDto staff,
    ScheduleDto schedule,
    UserDtoPublic user,
    CancellationRequestMiniDto cancellationRequest
) {}
