package com.example.demo.entity.join_table;

import java.util.List;
import java.util.UUID;

import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Staff;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "staff_services")
@NoArgsConstructor
@Setter
@Getter
public class StaffServices {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JoinColumn(name = "staff_id")
    @ManyToOne
    private Staff staff;

    @JoinColumn(name = "service_id")
    @ManyToOne
    private BusinessServices services;

}
