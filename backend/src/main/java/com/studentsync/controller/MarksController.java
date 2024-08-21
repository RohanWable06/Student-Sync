package com.studentsync.controller;

import com.studentsync.dto.MarksDTO;
import com.studentsync.service.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/marks")
public class MarksController {

    @Autowired
    private MarksService marksService;

    @GetMapping
    public List<MarksDTO> getAllMarks() {
    	System.out.println("in get all marks");
    	List<MarksDTO> list=marksService.getAllMarks();
    	System.out.println(list);
        return list;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarksDTO> getMarksById(@PathVariable Long id) {
        MarksDTO marks = marksService.getMarksById(id);
        return marks != null ? ResponseEntity.ok(marks) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MarksDTO> createMarks(@RequestBody MarksDTO marksDTO) {
    	MarksDTO marks = marksService.saveMarks(marksDTO);
    	return marks != null ? ResponseEntity.ok(marks) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarksDTO> updateMarks(@PathVariable Long id, @RequestBody MarksDTO marksDTO) {
        marksDTO.setId(id);
        MarksDTO updatedMarks = marksService.saveMarks(marksDTO);
        return updatedMarks != null ? ResponseEntity.ok(updatedMarks) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMarks(@PathVariable Long id) {
        marksService.deleteMarks(id);
        return ResponseEntity.ok().build();
    }
}
