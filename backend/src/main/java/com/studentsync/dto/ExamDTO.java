package com.studentsync.dto;


import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExamDTO {
    private Long id;
    private String examName;
    private Long courseId;
    private String courseName;
    private Long subjectId;
    private String subjectName;
    private Date examDate;
    private String location;

}

