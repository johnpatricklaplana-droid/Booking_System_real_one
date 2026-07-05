package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.AddServicesReviewDto;
import com.example.demo.entity.ServiceReviews;
import com.example.demo.mapper.ServiceReviewMapper;
import com.example.demo.repositories.ServiceReviewRepository;

import jakarta.persistence.EntityManager;

@Service
public class ServiceReviewService {

    @Autowired
    ServiceReviewMapper serviceReviewMapper;

    @Autowired
    ServiceReviewRepository serviceReviewRepo;

    @Autowired
    EntityManager entityManager;
    
    public void addReview(AddServicesReviewDto review) {

        ServiceReviews reviews = serviceReviewMapper.toServiceReviews(review, entityManager);

        serviceReviewRepo.save(reviews);

    }

}
