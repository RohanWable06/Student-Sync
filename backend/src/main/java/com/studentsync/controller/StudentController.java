package com.studentsync.controller;

import com.studentsync.dto.StudentDTO;

import com.studentsync.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<StudentDTO> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        StudentDTO student = studentService.getStudentById(id);
        return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
    }

    @GetMapping("rollno/{rollNo}")
    public StudentDTO getStudentByRollNo(@PathVariable String rollNo) {
    	return studentService.getStudentByRollNo(rollNo);
    }
    
    @PostMapping
    public StudentDTO createStudent(@RequestBody StudentDTO studentDTO) {
    	System.out.println("birthdate:"+studentDTO.getBirth());
    	studentDTO.setBirthdate(LocalDate.parse(studentDTO.getBirth()));
    	System.out.println(studentDTO);
        return studentService.saveStudent(studentDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDTO) {
        studentDTO.setId(id);
    	studentDTO.setBirthdate(LocalDate.parse(studentDTO.getBirth()));
        StudentDTO updatedStudent = studentService.saveStudent(studentDTO);
        return updatedStudent != null ? ResponseEntity.ok(updatedStudent) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }
}

