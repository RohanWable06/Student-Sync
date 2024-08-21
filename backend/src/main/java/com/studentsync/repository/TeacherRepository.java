package com.studentsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentsync.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

}
