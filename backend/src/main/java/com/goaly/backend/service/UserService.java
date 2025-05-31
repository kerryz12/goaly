package com.goaly.backend.service;

import com.goaly.backend.dto.UserDto;
import com.goaly.backend.entity.User;

import java.util.List;

public interface UserService {

    UserDto createUser(String email, String name);

    UserDto getUserById(Long id);

    UserDto getUserByEmail(String email);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long id, String name);

    void deleteUser(Long id);
}
