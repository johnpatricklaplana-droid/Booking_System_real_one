package com.example.demo.dto.response;

import java.math.BigDecimal;

public record BusinessTotalsDto(
    BigDecimal totalRevenue,
    Long totalBookings,
    Long totalCustomer
) {}
