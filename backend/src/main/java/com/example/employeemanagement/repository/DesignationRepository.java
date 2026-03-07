package com.example.employeemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.employeemanagement.entity.Designation;

public interface DesignationRepository
        extends JpaRepository<Designation, Integer>
{

    boolean existsByTitle(String title);

}