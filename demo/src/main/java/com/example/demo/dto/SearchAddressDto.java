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
    
    private String placeId;
    private String osmId;

    private double lat;
    private double lon;
    private String displayName;
    private List<Double> boundingBox;

    private String houseNumber;
    private String street;
    private String village;
    private String city;
    private String province;
    private String region;
    private String postalCode;
    private String country;
    private String countryCode;

    private String timezone;

}
