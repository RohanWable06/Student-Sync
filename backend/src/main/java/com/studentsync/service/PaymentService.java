package com.studentsync.service;


import com.studentsync.dto.PaymentDTO;
import com.studentsync.entity.Payment;
import com.studentsync.entity.Student;
import com.studentsync.repository.PaymentRepository;
import com.studentsync.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public PaymentDTO getPaymentById(Long id) {
        return paymentRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    public PaymentDTO savePayment(PaymentDTO paymentDTO) {
        Payment payment = convertToEntity(paymentDTO);
        Optional<Student> student = studentRepository.findById(paymentDTO.getStudentId());
        if(student.isPresent()) {
        	payment.setStudent(student.get());
        	payment = paymentRepository.save(payment);
        }
        
        return convertToDTO(payment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    private PaymentDTO convertToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setId(payment.getId());
        dto.setAmount(payment.getAmount());
        dto.setStudentId(payment.getStudent().getId());
        dto.setPaymentDate(payment.getPaymentDate());
        return dto;
    }

    private Payment convertToEntity(PaymentDTO dto) {
        Payment payment = new Payment();
        payment.setId(dto.getId());
        payment.setAmount(dto.getAmount());
        payment.setPaymentDate(dto.getPaymentDate());
        return payment;
    }
}
