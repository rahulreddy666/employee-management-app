package com.example.employeemanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.employeemanagement.dto.LoginRequest;
import com.example.employeemanagement.dto.LoginResponse;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {

        System.out.println("LOGIN ATTEMPT: " + request.getEmail());

        Employee employee = employeeRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    System.out.println("USER NOT FOUND");
                    return new RuntimeException("Invalid email or password");
                });

        System.out.println("USER FOUND");
        System.out.println("DB ROLE = " + employee.getRole());

        if (!passwordEncoder.matches(request.getPassword(), employee.getPassword())) {
            System.out.println("PASSWORD MISMATCH");
            throw new RuntimeException("Invalid email or password");
        }

        System.out.println("PASSWORD MATCHED");

        /* ====================================================
           CRITICAL NORMALIZATION FIX
           Ensures role works with Spring Security
        ==================================================== */
        String role = employee.getRole()
                .trim()
                .toUpperCase();

        System.out.println("NORMALIZED ROLE = " + role);

        // Generate JWT
        String token = jwtUtil.generateToken(
                employee.getEmail(),
                role
        );

        System.out.println("JWT CREATED");
        System.out.println("TOKEN ROLE CLAIM = " + role);

        return new LoginResponse(
                token,
                employee.getEmail(),
                role
        );
    }
}
