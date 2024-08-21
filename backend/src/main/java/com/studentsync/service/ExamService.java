package com.studentsync.service;

import com.studentsync.dto.ExamDTO;
import com.studentsync.entity.Course;
import com.studentsync.entity.Exam;
import com.studentsync.entity.Subject;
import com.studentsync.repository.ExamRepository;
import com.studentsync.repository.SubjectReporitory;
import com.studentsync.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;
    
    @Autowired 
    private SubjectReporitory subjectReporitory;

    @Autowired
    private CourseRepository courseRepository;

    public List<ExamDTO> getAllExams() {
        return examRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ExamDTO getExamById(Long id) {
        return examRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    public ExamDTO saveExam(ExamDTO examDTO) {
        Exam exam = convertToEntity(examDTO);
        Optional<Course> course = courseRepository.findById(examDTO.getCourseId());
        Optional<Subject> subject = subjectReporitory.findById(examDTO.getSubjectId());
        
        if(course.isPresent() && subject.isPresent()) {
        	exam.setCourse(course.get());
        	exam.setSubject(subject.get());
        	exam = examRepository.save(exam);
        }        
        
        return convertToDTO(exam);
    }

    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }

    private ExamDTO convertToDTO(Exam exam) {
        ExamDTO dto = new ExamDTO();
        dto.setId(exam.getId());
        dto.setExamName(exam.getExamName());
        dto.setCourseName(exam.getCourse().getTitle());
        dto.setSubjectName(exam.getSubject().getName());
        dto.setExamDate(exam.getExamDate());
        dto.setLocation(exam.getLocation());
        return dto;
    }

    private Exam convertToEntity(ExamDTO dto) {
        Exam exam = new Exam();
        exam.setId(dto.getId());
        exam.setExamName(dto.getExamName().toUpperCase());
        exam.setExamDate(dto.getExamDate());
        exam.setLocation(dto.getLocation());
        Long courseId=courseRepository.findIdByTitle(dto.getCourseName().toUpperCase());
        exam.setCourse(courseRepository.findById(courseId).orElseThrow(() -> new NoSuchElementException("Course not found")));
        return exam;
    }
}

