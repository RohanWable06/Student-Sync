package com.studentsync.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaymentDTO {
    private Long id;
    private Long studentId;
    private double amount;
    private LocalDate paymentDate=LocalDate.now();

}

