package com.studentsync.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherDTO {
    private Long id;
    private String name;
    private String email;
    private Long subject_id;
    private String subjectName;
    private String qualification;
    private String password;
    private String role;
    // Getters and Setters
}
