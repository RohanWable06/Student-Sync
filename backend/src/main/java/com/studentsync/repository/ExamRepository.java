package com.studentsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentsync.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {

}
