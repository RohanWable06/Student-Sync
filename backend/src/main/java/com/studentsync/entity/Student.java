package com.studentsync.entity;

import java.time.LocalDate;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class Student extends User {

    @NotNull
    private String firstName;
    private String lastName;        
   
    
    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;
    // Getters and Setters
    
    
    @Column(name="roll_no")
	private String rollNo;
    
    
    @Column(name="addmission_year")
    private int addmissionYear;
    
    
    @NotNull
    private String gender;
    
    
    
    private LocalDate birthDate;
    
    
    @Column(name="mobile_no")
    @Length(max = 10, min = 10)
    private String mobileNo;



	
}

