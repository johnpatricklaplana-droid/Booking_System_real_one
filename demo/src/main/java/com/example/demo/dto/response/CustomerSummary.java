package com.example.demo.dto.response;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public record CustomerSummary(
    String firstName,
    String lastName,
    String email,
    String avatarUrl,
    Long visitCount,
    ZonedDateTime lastVisit,
    BigDecimal totalSpent
) {}
