package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class BusinessDetailsDto {
    
    private UUID businessId;
    private String businessName;
    private String description;
    private String type;
    private String ownerName;
    private LocalDateTime startedAt;
    private String businessEmail;
    private String facebookPage;
    private AddressDto address;
    private String timezone;
    private String businessLogoUrl;

}
