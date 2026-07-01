package com.example.demo.dto.response;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleDto {

    private UUID id;
    private ZonedDateTime startsAt;
    private LocalDateTime createdAt;
    private String status;

}
