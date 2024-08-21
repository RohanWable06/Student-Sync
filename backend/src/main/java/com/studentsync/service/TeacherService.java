package com.studentsync.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentsync.dto.TeacherDTO;
import com.studentsync.entity.Role;
import com.studentsync.entity.Subject;
import com.studentsync.entity.Teacher;
import com.studentsync.repository.SubjectReporitory;
import com.studentsync.repository.TeacherRepository;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;
    
    @Autowired
    private SubjectReporitory subjectReporitory;

    public List<TeacherDTO> getAllTeachers() {
        return teacherRepository.findAll().stream()
        		.map(this::convertToDTO).collect(Collectors.toList());
    }

    public TeacherDTO getTeacherById(Long id) {
        return teacherRepository.findById(id)
        		.map(this::convertToDTO).orElse(null);
    }

    public TeacherDTO saveTeacher(TeacherDTO teacherDTO) {
        Teacher teacher = convertToEntity(teacherDTO);
        Optional<Subject> subject = subjectReporitory.findById(teacherDTO.getSubject_id());
        if (subject.isPresent()) {
            teacher.setSubject(subject.get());
            teacher = teacherRepository.save(teacher);
        } 
        
        return convertToDTO(teacher);
    }

    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }

    private TeacherDTO convertToDTO(Teacher teacher) {
        TeacherDTO dto = new TeacherDTO();
        dto.setId(teacher.getId());
        dto.setName(teacher.getName());
        dto.setEmail(teacher.getEmail());
        dto.setSubjectName(teacher.getSubject().getName());
        dto.setQualification(teacher.getQualification());
        dto.setRole(teacher.getRole().toString());
        dto.setPassword(teacher.getPassword());
        return dto;
    }

    private Teacher convertToEntity(TeacherDTO dto) {
        Teacher teacher = new Teacher();
        teacher.setId(dto.getId());
        teacher.setName(dto.getName());
        teacher.setEmail(dto.getEmail());
        teacher.setQualification(dto.getQualification());
        teacher.setRole(Role.FACULTY);
        teacher.setPassword(dto.getPassword());
        return teacher;
    }
}

