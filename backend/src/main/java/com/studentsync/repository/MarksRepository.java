package com.studentsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentsync.entity.Marks;

public interface MarksRepository extends JpaRepository<Marks, Long> {

}
