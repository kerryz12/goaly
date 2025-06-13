package com.goaly.backend.service;

import java.util.List;

import com.goaly.backend.dto.UserDto;

public interface UserService {

    UserDto createUser(String email, String name);

    UserDto getUserById(Long id);

    UserDto getUserByEmail(String email);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long id, String name);

    void deleteUser(Long id);
}
