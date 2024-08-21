package com.studentsync.repository;


import com.studentsync.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
	
	public Student findByRollNo(String rollNo);
}

