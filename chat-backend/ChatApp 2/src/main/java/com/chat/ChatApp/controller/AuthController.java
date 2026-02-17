package com.chat.ChatApp.controller;

import com.chat.ChatApp.entity.User;
import com.chat.ChatApp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return authService.signup(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        String token = authService.login(
                user.getEmail(),
                user.getPassword()
        );

        return Map.of("token", token);
    }

}