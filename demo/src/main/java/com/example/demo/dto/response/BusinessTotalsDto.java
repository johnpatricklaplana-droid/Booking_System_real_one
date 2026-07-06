package com.example.demo.dto.response;

public record BusinessTotalsDto(
    double totalRevenue,
    Long totalBookings,
    Long totalCustomer
) {}
