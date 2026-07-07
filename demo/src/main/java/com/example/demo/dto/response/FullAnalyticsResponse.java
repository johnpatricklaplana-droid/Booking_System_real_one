package com.example.demo.dto.response;

import java.util.List;

public record FullAnalyticsResponse(
    BusinessTotalsDto businessTotals,
    List<MonthlyStatsDto> monthlyStats,
    Double averageRating,
    List<ServiceDistributionDto> serviceDistribution,
    List<PeakHourDto> peakHour
) {}
