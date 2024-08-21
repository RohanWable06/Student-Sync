package com.studentsync.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Teacher extends User {

    private String name;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;
    
    private String qualification;
    
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;
  
    
}

