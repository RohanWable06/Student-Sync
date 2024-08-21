package com.studentsync.controller;

import com.studentsync.dto.SubjectDTO;
import com.studentsync.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping
    public List<SubjectDTO> getAllsubjects() {
        return subjectService.getAllsubjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectDTO> getsubjectById(@PathVariable Long id) {
        SubjectDTO subject = subjectService.getsubjectById(id);
        return subject != null ? ResponseEntity.ok(subject) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public SubjectDTO createsubject(@RequestBody SubjectDTO subjectDTO) {
    	System.out.println(subjectDTO);
        return subjectService.savesubject(subjectDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectDTO> updatesubject(@PathVariable Long id, @RequestBody SubjectDTO subjectDTO) {
        subjectDTO.setId(id);
        SubjectDTO updatedsubject = subjectService.savesubject(subjectDTO);
        return updatedsubject != null ? ResponseEntity.ok(updatedsubject) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletesubject(@PathVariable Long id) {
        subjectService.deletesubject(id);
        return ResponseEntity.ok("Record deleted -"+id);
    }
}
