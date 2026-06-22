package com.example.demo.dto;

import java.time.Duration;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddServiceRequestDto {

    private UUID businessId;
    private String serviceName;
    private String description;
    private Duration interval;
    private double price;
    private int capacity;

}
