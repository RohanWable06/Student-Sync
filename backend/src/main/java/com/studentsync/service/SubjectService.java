package com.studentsync.service;

import com.studentsync.dto.SubjectDTO;
import com.studentsync.entity.Course;
import com.studentsync.entity.Subject;
import com.studentsync.repository.CourseRepository;
import com.studentsync.repository.SubjectReporitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    @Autowired
    private SubjectReporitory subjectRepository;
    
    @Autowired
    private CourseRepository courseRepository;

    public List<SubjectDTO> getAllsubjects() {
        return subjectRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public SubjectDTO getsubjectById(Long id) {
        return subjectRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    public SubjectDTO savesubject(SubjectDTO subjectDTO)  {
        Subject subject = convertToEntity(subjectDTO);
        Optional<Course> course = courseRepository.findById(subjectDTO.getCourse_id());
        if(course.isPresent()) {
        	subject.setCourse(course.get());
        	subject = subjectRepository.save(subject);
        }
        
        return convertToDTO(subject);
    }

    public void deletesubject(Long id) {
        subjectRepository.deleteById(id);
    }

    private SubjectDTO convertToDTO(Subject subject) {
        SubjectDTO dto = new SubjectDTO();
        dto.setId(subject.getId());
        dto.setName(subject.getName());
        dto.setCourse_id(subject.getCourse().getId());
        dto.setCourseName(subject.getCourse().getTitle());
        return dto;
    }

    private Subject convertToEntity(SubjectDTO dto) {
        Subject subject = new Subject();
        subject.setId(dto.getId());
        subject.setName(dto.getName().toUpperCase());
        return subject;
    }
}

