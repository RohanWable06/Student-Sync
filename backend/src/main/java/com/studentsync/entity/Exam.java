package com.studentsync.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Optional;

@Entity
@Getter
@Setter
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //optional
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private String examName;
    
    @Temporal(TemporalType.DATE)
    private Date examDate;

    private String location;
    
       
	////////////////////////////////////////////////////////////////
	@OneToOne
	@JoinColumn(name="subject_id")
	private Subject subject;


}

