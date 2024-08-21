package com.studentsync.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentsync.dto.LoginDTO;
import com.studentsync.entity.User;
import com.studentsync.repository.UserReopsitory;

@CrossOrigin
@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private UserReopsitory userReopsitory;
	
	@PostMapping
	public ResponseEntity<Long> login(@RequestBody LoginDTO loginDTO){
		
		Optional<User> user =  userReopsitory.findByEmail(loginDTO.getEmail());
		if(user.isPresent()) {
			if(user.get().getPassword().equals(loginDTO.getPassword())) {
				return ResponseEntity.ok(user.get().getId());
			}
		}
		return ResponseEntity.notFound().build();
	}
	
	
}
