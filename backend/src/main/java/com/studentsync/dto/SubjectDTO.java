package com.studentsync.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SubjectDTO {
    private Long id;
    private String name;
    private Long course_id;
    private String courseName;

}

