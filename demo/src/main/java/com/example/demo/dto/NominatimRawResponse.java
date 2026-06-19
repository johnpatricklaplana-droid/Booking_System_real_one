package com.example.demo.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Setter
@Getter
public class NominatimRawResponse {
    
    @JsonProperty("place_id")
    private long placeId;

    @JsonProperty("osm_id")
    private String osmId;

    private double lat;
    private double lon;

    @JsonProperty("display_name")
    private String displayName;

    private Address address;

    @JsonProperty("boundingbox")
    private List<Double> boundingBox;

}