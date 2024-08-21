package com.studentsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentsync.entity.Subject;

public interface SubjectReporitory extends JpaRepository<Subject, Long> {

}
