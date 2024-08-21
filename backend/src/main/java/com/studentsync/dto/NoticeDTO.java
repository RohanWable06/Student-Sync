package com.studentsync.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class NoticeDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	private Date noticeDate;
	
	private String description;
}
