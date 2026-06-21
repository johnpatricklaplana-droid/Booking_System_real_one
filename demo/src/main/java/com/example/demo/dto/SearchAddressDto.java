package com.example.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchAddressDto {

    private Double lat;
    private Double lon;
    private String displayName;

    private String houseNumber;
    private String road;
    private String city;
    private String province;
    private String postalCode;
    private String country;
    private String countryCode;

    private String timezone;

}
