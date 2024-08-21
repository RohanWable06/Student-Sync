/*
 * package com.studentsync.service;
 * 
 * import com.studentsync.dto.EnrollmentDTO; import
 * com.studentsync.entity.Enrollment; import
 * com.studentsync.repository.EnrollmentRepository; import
 * com.studentsync.repository.StudentRepository; import
 * com.studentsync.repository.CourseRepository; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.stereotype.Service;
 * 
 * import java.util.List; import java.util.stream.Collectors;
 * 
 * @Service public class EnrollmentService {
 * 
 * @Autowired private EnrollmentRepository enrollmentRepository;
 * 
 * @Autowired private StudentRepository studentRepository;
 * 
 * @Autowired private CourseRepository courseRepository;
 * 
 * public List<EnrollmentDTO> getAllEnrollments() { return
 * enrollmentRepository.findAll().stream().map(this::convertToDTO).collect(
 * Collectors.toList()); }
 * 
 * public EnrollmentDTO getEnrollmentById(Long id) { return
 * enrollmentRepository.findById(id).map(this::convertToDTO).orElse(null); }
 * 
 * public EnrollmentDTO saveEnrollment(EnrollmentDTO enrollmentDTO) { Enrollment
 * enrollment = convertToEntity(enrollmentDTO); enrollment =
 * enrollmentRepository.save(enrollment); return convertToDTO(enrollment); }
 * 
 * public void deleteEnrollment(Long id) { enrollmentRepository.deleteById(id);
 * }
 * 
 * private EnrollmentDTO convertToDTO(Enrollment enrollment) { EnrollmentDTO dto
 * = new EnrollmentDTO(); dto.setId(enrollment.getId());
 * dto.setStudentId(enrollment.getStudent() != null ?
 * enrollment.getStudent().getId() : null);
 * dto.setCourseId(enrollment.getCourse() != null ?
 * enrollment.getCourse().getId() : null);
 * 
 * return dto; }
 * 
 * private Enrollment convertToEntity(EnrollmentDTO dto) { Enrollment enrollment
 * = new Enrollment(); enrollment.setId(dto.getId());
 * enrollment.setStudent(dto.getStudentId() != null ?
 * studentRepository.findById(dto.getStudentId()).orElse(null) : null);
 * enrollment.setCourse(dto.getCourseId() != null ?
 * courseRepository.findById(dto.getCourseId()).orElse(null) : null);
 * 
 * return enrollment; } }
 * 
 */