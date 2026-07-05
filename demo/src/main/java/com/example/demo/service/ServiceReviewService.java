package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.AddServicesReviewDto;
import com.example.demo.dto.response.ServiceReviewDto;
import com.example.demo.dto.response.ServiceReviewWithUser;
import com.example.demo.dto.response.UserDtoPublic;
import com.example.demo.entity.BusinessServices;
import com.example.demo.entity.Schedule;
import com.example.demo.entity.ServiceReviews;
import com.example.demo.entity.Users;
import com.example.demo.mapper.ServiceReviewMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repositories.ScheduleRepository;
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

    @Autowired
    ScheduleRepository scheduleRepo;
    
    @Autowired
    UserMapper userMapper;

    public void addReview(AddServicesReviewDto review) {

        Schedule schedule = scheduleRepo.findById(review.getScheduleId()).orElse(null);

        ServiceReviews reviews = serviceReviewMapper.toServiceReviews(review, entityManager);
        reviews.setServices(entityManager.getReference(BusinessServices.class, schedule.getService().getId()));
        reviews.setUser(schedule.getUser());
        
        serviceReviewRepo.save(reviews);

    }

    public List<ServiceReviewWithUser> getServiceReviews(UUID serviceId) {
        
        List<ServiceReviews> serviceReviews = serviceReviewRepo.getReviews(serviceId);

        return serviceReviews.stream()
            .map(sr -> {
                ServiceReviewDto review = serviceReviewMapper.toServiceReviewDto(sr);
                UserDtoPublic user = userMapper.toUserDtoPublic(sr.getUser());
                return new ServiceReviewWithUser(review, user);
            })
            .toList();
        
    }

}
