package com.example.employeemanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.employeemanagement.dto.CreateLoginRequest;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.service.EmployeeService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginManagementController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // =====================================================
    // CREATE / RESET LOGIN
    // =====================================================
    @PostMapping("/create-login")
    public ResponseEntity<?> createLogin(@RequestBody CreateLoginRequest request) {

        try {

            String generatedPassword =
                    employeeService.createOrResetLogin(request);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login created/reset successfully");
            response.put("generatedPassword", generatedPassword);

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // =====================================================
    // GET ALL CREATED LOGINS
    // =====================================================
    @GetMapping("/logins")
    public ResponseEntity<?> getAllCreatedLogins() {

        try {

            List<Employee> employees =
                    employeeService.getAllCreatedLogins();

            return ResponseEntity.ok(employees);

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // =====================================================
    // TEMPORARY METHOD TO GENERATE ENCODED ADMIN PASSWORD
    // =====================================================
    // ⚠️ Use only once and then REMOVE it
    @GetMapping("/test-password")
    public String encodePassword() {
        return passwordEncoder.encode("Admin@123");
    }
}