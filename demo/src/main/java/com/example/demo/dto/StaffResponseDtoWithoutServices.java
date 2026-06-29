package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffResponseDtoWithoutServices {
    private String staffId;
    private String fullName;
    private String title;
    private String avatarUrl;
    private boolean isActive;
    private LocalDateTime createdAt;
    private List<StaffUnavailableDto> unavailable;
}
