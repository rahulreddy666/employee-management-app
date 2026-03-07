package com.example.employeemanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    // ⭐ Admin Dashboard
    @GetMapping("/dashboard")
    public String adminDashboard() {
        return "Welcome Admin Dashboard";
    }
}
