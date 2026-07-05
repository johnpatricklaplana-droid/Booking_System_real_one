package com.example.demo.dto.request;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddServicesReviewDto {
    private int rating;
    private String comment;
    private UUID scheduleId;
}
