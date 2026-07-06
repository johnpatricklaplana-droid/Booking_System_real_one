package com.example.demo.dto.response;

public record ServiceWithBusinessDto(
    ServicesDetailsDto services,
    BusinessDetailsDto business
) {}
