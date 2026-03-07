package com.example.employeemanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.employeemanagement.dto.CreateLoginRequest;
import com.example.employeemanagement.dto.EmployeeDropdownDTO;
import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // ============================================
    // DASHBOARD TEST
    // ============================================
    @GetMapping("/dashboard")
    public ResponseEntity<String> employeeDashboard() {
        return ResponseEntity.ok("Welcome Employee Dashboard");
    }

    // ============================================
    // GET ALL EMPLOYEES (Admin Table)
    // ============================================
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // ============================================
    // GET EMPLOYEE BY ID
    // ============================================
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ============================================
    // GET EMPLOYEES FOR DROPDOWN
    // (Used in Create / Reset Login page)
    // ============================================
    @GetMapping("/dropdown")
    public ResponseEntity<List<EmployeeDropdownDTO>> getEmployeesForDropdown() {
        return ResponseEntity.ok(employeeService.getAllEmployeesForDropdown());
    }

    // ============================================
    // CREATE OR RESET LOGIN
    // ============================================
    @PostMapping("/create-login")
    public ResponseEntity<String> createOrResetLogin(
            @RequestBody CreateLoginRequest request) {

        String generatedPassword = employeeService.createOrResetLogin(request);
        return ResponseEntity.ok(generatedPassword);
    }

    // ============================================
    // GET ALL CREATED LOGINS
    // (For table below Create Login form)
    // ============================================
    @GetMapping("/created-logins")
    public ResponseEntity<List<Employee>> getAllCreatedLogins() {
        return ResponseEntity.ok(employeeService.getAllCreatedLogins());
    }

    // ============================================
    // CREATE EMPLOYEE
    // ============================================
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.createEmployee(employee));
    }

    // ============================================
    // UPDATE EMPLOYEE
    // ============================================
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        return ResponseEntity.ok(employeeService.updateEmployee(id, employee));
    }

    // ============================================
    // DELETE EMPLOYEE
    // ============================================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}