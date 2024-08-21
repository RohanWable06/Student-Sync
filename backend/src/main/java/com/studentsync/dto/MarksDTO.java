package com.studentsync.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MarksDTO {
    private Long id;
    private Long studentId;
    private Long examId;
    private double marks;
    private String subjectName;
    private String examName;
    

}
