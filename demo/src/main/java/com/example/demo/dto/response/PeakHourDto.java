package com.example.demo.dto.response;

public record PeakHourDto(
    Integer hour,
    Long bookingCount
) {}
