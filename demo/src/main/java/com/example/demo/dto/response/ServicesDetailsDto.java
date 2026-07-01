package com.example.demo.dto.response;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ServicesDetailsDto {
    private UUID id;
    private String serviceName;
    private String serviceLogoUrl;
    private String status;
    private String description;
    private String duration;
    private double price;
    private int capacity;
}
