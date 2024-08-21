package com.studentsync.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MaterialDTO {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
    private String name;
    private String description;
    private String link;
}
