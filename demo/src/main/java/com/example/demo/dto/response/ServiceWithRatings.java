package com.example.demo.dto.response;

import java.util.List;

public record ServiceWithRatings(
    List<ServiceReviewDto> review,
    ServicesDetailsDto services
) {}
