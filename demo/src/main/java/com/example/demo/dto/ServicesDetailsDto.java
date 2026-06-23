package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ServicesDetailsDto {
    private String serviceName;
    private String serviceLogoUrl;
    private String status;
    private String description;
    private String duration;
    private double price;
}
