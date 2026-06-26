package com.example.demo.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "address")
@NoArgsConstructor
@Getter
@Setter
public class Address {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private double lat;
    private double lon;

    @Column(name = "display_name")
    private String displayName;

    private String road;
    private String city;
    private String province;

    @Column(name = "postal_code")
    private String postalCode;

    private String country;

    @Column(name = "country_code")
    private String countryCode;

    private String timezone;

    @OneToOne(mappedBy = "addressId")
    private Business businessId;

}
