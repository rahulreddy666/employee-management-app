package com.example.employeemanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_profiles")
public class EmployeeProfile {

    // =====================================================
    // PRIMARY KEY
    // =====================================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =====================================================
    // PERSONAL DETAILS
    // =====================================================
    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true)
    private String empId;

    private String gender;
    private String dob;
    private String maritalStatus;

    @Column(unique = true)
    private String email;

    private String aadhar;   // 🔹 Added (frontend has this)
    private String pan;      // 🔹 Added (frontend has this)

    // =====================================================
    // JOB DETAILS
    // =====================================================
    @Column(name = "designation")
    private String designation;  // 🔹 Important for filtering

    private String salary;
    private String role;
    private String department;

    @Column(length = 1000)
    private String skills;

    // =====================================================
    // BANK DETAILS
    // =====================================================
    private String bankName;
    private String accountNumber;
    private String ifsc;

    // =====================================================
    // EDUCATION DETAILS
    // =====================================================
    private String qualification;
    private String university;
    private String passingYear;

    // =====================================================
    // GETTERS & SETTERS
    // =====================================================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmpId() { return empId; }
    public void setEmpId(String empId) { this.empId = empId; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAadhar() { return aadhar; }
    public void setAadhar(String aadhar) { this.aadhar = aadhar; }

    public String getPan() { return pan; }
    public void setPan(String pan) { this.pan = pan; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }

    public String getIfsc() { return ifsc; }
    public void setIfsc(String ifsc) { this.ifsc = ifsc; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }

    public String getPassingYear() { return passingYear; }
    public void setPassingYear(String passingYear) { this.passingYear = passingYear; }
}