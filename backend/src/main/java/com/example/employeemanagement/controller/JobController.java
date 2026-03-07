package com.example.employeemanagement.controller;

import com.example.employeemanagement.entity.Job;
import com.example.employeemanagement.service.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    // Get all active jobs
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllActiveJobs();
    }

    // Get job details
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }
}