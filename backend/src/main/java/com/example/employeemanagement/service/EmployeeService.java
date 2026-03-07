package com.example.employeemanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.employeemanagement.dto.CreateLoginRequest;
import com.example.employeemanagement.dto.EmployeeDropdownDTO;
import com.example.employeemanagement.dto.SignupRequest;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.security.PasswordUtil;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // =====================================================
    // SIGNUP
    // =====================================================
    public void signup(SignupRequest request) {

        employeeRepository.findByEmail(request.getEmail())
                .ifPresent(e -> {
                    throw new RuntimeException("Email already exists");
                });

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        Employee employee = new Employee();
        employee.setEmail(request.getEmail());
        employee.setPassword(passwordEncoder.encode(request.getPassword()));
        employee.setRole(request.getRole().trim().toUpperCase());

        employeeRepository.save(employee);
    }

    // =====================================================
    // CREATE OR RESET LOGIN
    // =====================================================
    public String createOrResetLogin(CreateLoginRequest request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Check email uniqueness
        employeeRepository.findByEmail(request.getEmail())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(employee.getId())) {
                        throw new RuntimeException("Email already in use");
                    }
                });

        // Generate password
        String rawPassword = PasswordUtil.generatePassword();

        // Encode password
        String encodedPassword = passwordEncoder.encode(rawPassword);

        // Update employee login fields
        employee.setEmail(request.getEmail());
        employee.setPassword(encodedPassword);
        employee.setRole(request.getRole().trim().toUpperCase());

        employeeRepository.save(employee);

        return rawPassword;
    }

    // =====================================================
    // GET EMPLOYEES FOR DROPDOWN
    // =====================================================
    public List<EmployeeDropdownDTO> getAllEmployeesForDropdown() {

        return employeeRepository.findAll()
                .stream()
                .map(emp -> new EmployeeDropdownDTO(
                        emp.getId(),
                        emp.getEmail(),   // use email as display name
                        emp.getEmail()
                ))
                .toList();
    }

    // =====================================================
    // GET ALL CREATED LOGINS
    // =====================================================
    public List<Employee> getAllCreatedLogins() {

        return employeeRepository.findAll()
                .stream()
                .filter(emp -> emp.getPassword() != null)
                .toList();
    }

    // =====================================================
    // BASIC CRUD
    // =====================================================
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {

        if (employee.getPassword() != null) {
            employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        }

        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setEmail(updatedEmployee.getEmail());

        if (updatedEmployee.getPassword() != null) {
            employee.setPassword(passwordEncoder.encode(updatedEmployee.getPassword()));
        }

        employee.setRole(updatedEmployee.getRole());

        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}