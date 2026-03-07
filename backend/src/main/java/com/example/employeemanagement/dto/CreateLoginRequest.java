package com.example.employeemanagement.dto;

public class CreateLoginRequest {

    private Long employeeId;
    private String email;
    private String role;

    // Getter for employeeId
    public Long getEmployeeId() {
        return employeeId;
    }

    // Setter for employeeId
    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    // Getter for email
    public String getEmail() {
        return email;
    }

    // Setter for email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter for role
    public String getRole() {
        return role;
    }

    // Setter for role
    public void setRole(String role) {
        this.role = role;
    }
}