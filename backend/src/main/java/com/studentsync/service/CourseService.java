	package com.studentsync.service;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentsync.dto.CourseDTO;
import com.studentsync.entity.Course;
import com.studentsync.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;


    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
        		.map(this::convertToDTO).collect(Collectors.toList());
    }

    public CourseDTO getCourseById(Long id) {
        return courseRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    public CourseDTO saveCourse(CourseDTO courseDTO) {
        Course course = convertToEntity(courseDTO);
        course = courseRepository.save(course);
        return convertToDTO(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    private CourseDTO convertToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setCredits(course.getCredits());
        dto.setAbout(course.getAbout());
        return dto;
    }
    
    

    private Course convertToEntity(CourseDTO dto) {
        Course course = new Course();
        course.setId(dto.getId());
        course.setTitle(dto.getTitle().toUpperCase());
        course.setCredits(dto.getCredits());
        course.setAbout(dto.getAbout());
        return course;
    }
}

