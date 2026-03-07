package com.example.employeemanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Job reference
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    // Employee reference
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    // Application stage
    private String stage;

    // Cover letter text
    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    // Resume file path stored in database
    @Column(name = "resume_path")
    private String resumePath;

    // Date when application was submitted
    private LocalDateTime appliedDate;

    // --------------------
    // Getters and Setters
    // --------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }
}