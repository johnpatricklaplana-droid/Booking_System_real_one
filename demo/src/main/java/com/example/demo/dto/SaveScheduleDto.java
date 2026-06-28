package com.example.demo.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveScheduleDto {
    
    private UUID serviceId;
    private String startsAt;
    private UUID staffId;

}
