package com.studentsync.repository;

import com.studentsync.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
	public Long findIdByTitle(String title);
}

