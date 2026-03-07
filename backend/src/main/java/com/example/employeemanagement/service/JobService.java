package com.example.employeemanagement.service;

import com.example.employeemanagement.entity.Job;
import java.util.List;

public interface JobService {

    List<Job> getAllActiveJobs();

    Job getJobById(Long id);

}