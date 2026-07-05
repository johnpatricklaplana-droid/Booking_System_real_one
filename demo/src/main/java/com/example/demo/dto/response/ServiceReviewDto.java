package com.example.demo.dto.response;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceReviewDto {

    private String comment;
    private Integer rating;
    private LocalDateTime createdAt;

}
