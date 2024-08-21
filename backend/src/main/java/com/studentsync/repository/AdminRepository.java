package com.studentsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentsync.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{

}
