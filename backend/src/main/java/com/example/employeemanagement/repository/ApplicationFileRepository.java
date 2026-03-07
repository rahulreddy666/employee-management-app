package com.example.employeemanagement.repository;

import com.example.employeemanagement.entity.ApplicationFile;
import com.example.employeemanagement.entity.JobApplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationFileRepository extends JpaRepository<ApplicationFile, Long> {

    List<ApplicationFile> findByApplication(JobApplication application);

}