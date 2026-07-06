package com.example.demo.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record MonthlyStatsDto(
    LocalDateTime month,
    BigDecimal revenueOfTheMonth,
    Long bookingsOfTheMonth
) {}
