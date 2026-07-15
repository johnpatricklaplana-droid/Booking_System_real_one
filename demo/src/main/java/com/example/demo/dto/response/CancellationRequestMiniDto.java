package com.example.demo.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record CancellationRequestMiniDto ( 
    UUID id,
    String message,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
