package com.example.demo.helper;

import java.time.Duration;
import java.util.List;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import com.example.demo.dto.request.SearchAddressDto;
import com.example.demo.dto.response.AddressDto;
import com.example.demo.dto.response.NominatimRawResponse;
import com.example.demo.dto.response.UserDto;
import com.example.demo.entity.Users;

@Component
public class UserHelper {
    
    public ResponseCookie createJwtCookie (String jwtToken) {
        return ResponseCookie.from("jwt-token", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("Strict")
                .build();
    } 

    public List<String> extractUserRole (Users user) {

        return user.getRoles().stream()
            .map(u -> u.getRole())
            .toList();
    }

    public UserDto toUserDto (Users user) {

        UserDto dto = new UserDto();
        dto.setFirstName(user.getFirstName());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setLastName(user.getLastName());
        dto.setRoles(user.getRoles().stream().map(r -> r.getRole()).toList());
        dto.setEmail(user.getEmail());
        dto.setLastActiveRole(user.getLastActiveRole());

        return dto;

    }

    public SearchAddressDto toSearchAddressDto (NominatimRawResponse raw) {
        AddressDto address = raw.getAddress();

        if(address == null) return new SearchAddressDto();

        return SearchAddressDto.builder()
            .lon(raw.getLon())
            .lat(raw.getLat())
            .displayName(raw.getDisplayName())
            .road(address.getRoad())
            .city(address.getCity() != null ? address.getCity() : address.getTown())
            .province(address.getState())
            .postalCode(address.getPostalCode())
            .country(address.getCountry())
            .countryCode(address.getCountryCode())
            .build();
    }

}
