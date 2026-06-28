package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceDetailsDto {

    // business
    private BusinessDetailsDto business;

    // service
    private String serviceLogoUrl;
    private String status;
    private String description;
    private String duration;
    private double price;
    private int capacity;

    List<StaffResponseDtoWithoutServices> staffs;

}