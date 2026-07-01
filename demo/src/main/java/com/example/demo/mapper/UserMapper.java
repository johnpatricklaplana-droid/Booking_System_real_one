package com.example.demo.mapper;

import org.mapstruct.Mapper;

import com.example.demo.dto.response.UserDtoPublic;
import com.example.demo.entity.Users;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    UserDtoPublic toUserDtoPublic(Users user);

}
