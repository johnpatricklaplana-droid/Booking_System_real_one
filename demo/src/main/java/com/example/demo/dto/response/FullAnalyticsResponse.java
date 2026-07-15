package com.example.demo.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record FullAnalyticsResponse(
    BusinessTotalsDto businessTotals,
    List<MonthlyStatsDto> monthlyStats,
    BigDecimal averageRating,
    List<ServiceDistributionDto> serviceDistribution,
    List<PeakHourDto> peakHour
) {}
