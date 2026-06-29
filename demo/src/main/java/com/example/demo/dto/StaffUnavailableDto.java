package com.example.demo.dto;

import java.time.ZonedDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffUnavailableDto {

    private ZonedDateTime start;
    private ZonedDateTime end;

}
