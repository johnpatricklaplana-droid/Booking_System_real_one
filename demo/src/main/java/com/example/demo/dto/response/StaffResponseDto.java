package com.example.demo.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffResponseDto {
    private String id;
    private String fullName;
    private String title;
    private String avatarUrl;
    private boolean isActive;
    private LocalDateTime createdAt;
}
