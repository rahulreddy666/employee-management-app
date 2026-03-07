package com.example.employeemanagement.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.employeemanagement.dto.LoginRequest;
import com.example.employeemanagement.dto.LoginResponse;
import com.example.employeemanagement.dto.SignupRequest;
import com.example.employeemanagement.service.AuthService;
import com.example.employeemanagement.service.EmployeeService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private EmployeeService employeeService;

    // ✅ SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        employeeService.signup(request);
        return ResponseEntity.ok("Signup successful");
    }

    // ✅ LOGIN (JWT)
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

}


