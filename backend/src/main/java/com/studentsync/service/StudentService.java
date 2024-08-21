package com.studentsync.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentsync.dto.StudentDTO;
import com.studentsync.entity.Course;
import com.studentsync.entity.Role;
import com.studentsync.entity.Student;
import com.studentsync.repository.CourseRepository;
import com.studentsync.repository.StudentRepository;

@Service
public class StudentService {

	private static int count =0; 
    @Autowired
    private StudentRepository studentRepository;    
    
    @Autowired
    private CourseRepository courseRepository;
    
    

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream().map(student->this.convertToDTO(student)).collect(Collectors.toList());
    }

    public StudentDTO getStudentById(Long id) {
        return studentRepository.findById(id).map(this::convertToDTO).orElse(null);
    }
    
    public StudentDTO getStudentByRollNo(String id) {
         
        		Student student=studentRepository.findByRollNo(id);
        		return this.convertToDTO(student);
    }

    public StudentDTO saveStudent(StudentDTO studentDTO) {
        Student student = convertToEntity(studentDTO);
        Optional<Course> course = courseRepository.findById(studentDTO.getCourse());
        if(course!=null) {
        	student.setCourse(course.get());
        }
        student = studentRepository.save(student);
        return convertToDTO(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    private StudentDTO convertToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setPassword(student.getPassword());
        dto.setCourse(student.getCourse().getId());
        dto.setRollNo(student.getRollNo());
        dto.setAddmissionYear(student.getAddmissionYear());
        dto.setGender(student.getGender());
        dto.setBirthdate(student.getBirthDate());
        dto.setMobileNo(student.getMobileNo());
        dto.setRole(student.getRole().toString());
        dto.setCourseName(student.getCourse().getTitle());
       
        return dto;
    }

    private Student convertToEntity(StudentDTO dto) {
        Student student = new Student();
        student.setId(dto.getId());
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setPassword(dto.getPassword());        
        student.setAddmissionYear(LocalDate.now().getYear());
        student.setGender(dto.getGender());
        student.setBirthDate(dto.getBirthdate());
        student.setMobileNo(dto.getMobileNo());
        student.setRollNo(generateRollNo(dto));
        student.setRole(Role.STUDENT);
        return student;
    }
    
    
    private String generateRollNo(StudentDTO student) {
    	String year=String.valueOf(LocalDate.now().getYear());
    	String courseId=String.valueOf(student.getCourse());
    	++count;
    	return year+courseId+count;
    }
}

