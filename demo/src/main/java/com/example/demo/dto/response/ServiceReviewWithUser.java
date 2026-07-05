package com.example.demo.dto.response;

public record ServiceReviewWithUser(
    ServiceReviewDto review,
    UserDtoPublic user
) {}
