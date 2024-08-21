package com.studentsync.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentsync.entity.Admin;
import com.studentsync.entity.Role;
import com.studentsync.repository.AdminRepository;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	AdminRepository adminRepository;
	
	@PostMapping
	public Admin addAdmin(@RequestBody Admin admin){
		admin.setRole(Role.ADMIN);
		return adminRepository.save(admin);
	}
	
	@GetMapping
	public List<Admin> getAllAdmins(){
		return adminRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Admin> getAdmin(@PathVariable Long id) {
		return adminRepository.findById(id);
	}
	
	@PutMapping("/{id}")
	public Admin updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
		Optional<Admin> adminOptional = adminRepository.findById(id);
		if (adminOptional.isPresent()) {
			Admin admin = adminOptional.get();
			admin.setEmail(adminDetails.getEmail());
			// Assuming we don't want to update the password here, just update the email
			return adminRepository.save(admin);
		} else {
			// Handle the case where the admin is not found
			return null;
		}
	}
}
