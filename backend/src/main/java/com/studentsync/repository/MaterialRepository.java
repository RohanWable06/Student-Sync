package com.studentsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentsync.entity.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {

}
