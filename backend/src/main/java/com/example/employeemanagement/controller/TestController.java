package com.example.employeemanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    // 🔐 This API should be protected by JWT
    @GetMapping("/hello")
    public String hello() {
        return "Hello, JWT is working!";
    }
}
