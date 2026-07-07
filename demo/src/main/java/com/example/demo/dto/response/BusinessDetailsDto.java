package com.example.demo.dto.response;

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
    private LocalDateTime startedAt;
    private String businessEmail;
    private String status;
    private String facebookPage;
    private String timezone;
    private AddressDto address;
    private String businessLogoUrl;

}
