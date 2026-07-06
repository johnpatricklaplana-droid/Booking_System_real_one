package com.example.demo.dto.response;

import java.time.ZonedDateTime;

public record CustomerSummary(
    String firstName,
    String lastName,
    String email,
    Long visitCount,
    ZonedDateTime lastVisit,
    double totalSpent
) {}
