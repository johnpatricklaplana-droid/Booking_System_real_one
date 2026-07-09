package com.example.demo.dto.request;

import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceAvailabilityDto {

    private String day;
    private LocalTime startTime;
    private LocalTime endTime;

}
