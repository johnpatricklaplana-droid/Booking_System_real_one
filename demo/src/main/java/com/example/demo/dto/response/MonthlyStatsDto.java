package com.example.demo.dto.response;

import java.time.LocalDateTime;

public record MonthlyStatsDto(
    LocalDateTime month,
    double revenueOfTheMonth,
    Long bookingsOfTheMonth
) {}
