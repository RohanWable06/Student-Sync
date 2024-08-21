package com.studentsync.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StudentDTO {
    @JsonProperty(access = Access.READ_ONLY)
	private Long id;
    @JsonProperty(access = Access.READ_ONLY)
    private String rollNo;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String gender;
    private String birth;
    private LocalDate birthdate;
    private String mobileNo;
    @JsonProperty(access = Access.READ_ONLY)
    private int addmissionYear;
    private Long course;
    private String role;
    private String courseName;

}

