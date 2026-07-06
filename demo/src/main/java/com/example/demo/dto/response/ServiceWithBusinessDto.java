package com.example.demo.dto.response;

import java.util.List;

public record ServiceWithBusinessDto(
    ServicesDetailsDto services,
    BusinessDetailsDto business,
    List<ServiceReviewDto> review
) {}
