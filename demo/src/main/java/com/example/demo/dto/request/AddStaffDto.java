package com.example.demo.dto.request;

import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter 
public class AddStaffDto { 
    
    private UUID businessId;
    private List<UUID> serviceId;
    private String fullName;
    private String title;

}
