package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddressDto {
    @JsonProperty("house_number")
    private String houseNumber;

    @JsonProperty("road")
    private String road;

    private String village;
    private String city;
    private String state;
    private String region;

    @JsonProperty("postcode")
    private String postalCode;
    private String country;

    @JsonProperty("country_code")
    private String counrtyCode;
}
