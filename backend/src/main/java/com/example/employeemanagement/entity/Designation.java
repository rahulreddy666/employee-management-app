package com.example.employeemanagement.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "designations")
@Access(AccessType.FIELD)
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String title;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    public Designation() {
    }

    public Designation(String title) {
        this.title = title != null ? title.trim() : null;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
        if (this.title != null) {
            this.title = this.title.trim();
        }
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setTitle(String title) {
        this.title = title != null ? title.trim() : null;
    }
}