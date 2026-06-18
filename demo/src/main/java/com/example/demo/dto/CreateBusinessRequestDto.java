package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateBusinessRequestDto {
    
    private String businessName;
    private String businessType;
    private String description;
    private String businessEmail;
    private String businessPhoneNumber;
    private String address;
    private String timezone;
    private String logoUrl;

}
