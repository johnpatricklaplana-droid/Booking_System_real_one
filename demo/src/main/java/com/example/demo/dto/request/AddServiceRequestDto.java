package com.example.demo.dto.request;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;
import java.util.UUID;

import com.google.firebase.database.annotations.NotNull;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddServiceRequestDto {

    @NotNull
    private UUID businessId;

    @NotBlank
    private String serviceName;
    @NotBlank
    private String description;

    @NotNull
    private Duration duration;
    
    @NotNull
    private BigDecimal price;
    
    @NotNull
    @Positive
    private Integer capacity;
    
    @NotEmpty
    private List<ServiceAvailabilityDto> availability;
    
    @NotEmpty
    private List<ServiceCategoryDto> categories;

}
