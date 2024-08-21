package com.studentsync.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentsync.dto.MarksDTO;
import com.studentsync.entity.Exam;
import com.studentsync.entity.Marks;
import com.studentsync.entity.Student;
import com.studentsync.repository.ExamRepository;
import com.studentsync.repository.MarksRepository;
import com.studentsync.repository.StudentRepository;

@Service
public class MarksService {

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ExamRepository examRepository;
    
    

    public List<MarksDTO> getAllMarks() {
        return marksRepository.findAll().stream().
        		map(this::convertToDTO).
        		collect(Collectors.toList());
    }

    public MarksDTO getMarksById(Long id) {
        return marksRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    public MarksDTO saveMarks(MarksDTO marksDTO) {
        Marks marks = convertToEntity(marksDTO);
        Optional<Student> student = studentRepository.findById(marksDTO.getStudentId());
        Optional<Exam> exam = examRepository.findById(marksDTO.getExamId());
        if(exam.isPresent() && student.isPresent()) {
        	marks.setExam(exam.get());
        	marks.setStudent(student.get());
        	marks = marksRepository.save(marks);
        }
        
        return convertToDTO(marks);
    }

    public void deleteMarks(Long id) {
        marksRepository.deleteById(id);
    }

    private MarksDTO convertToDTO(Marks marks) {
        MarksDTO dto = new MarksDTO();
        dto.setId(marks.getId());
       dto.setExamId(marks.getExam().getId());
        dto.setStudentId(marks.getStudent().getId());
        dto.setMarks(marks.getMarks());
        dto.setSubjectName(marks.getExam().getSubject().getName());
        dto.setExamName(marks.getExam().getExamName());
        return dto;
    }

    private Marks convertToEntity(MarksDTO dto) {
        Marks marks = new Marks();
       
        marks.setMarks(dto.getMarks());
        return marks;
    }
}

