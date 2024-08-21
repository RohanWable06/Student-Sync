package com.studentsync.service;

import com.studentsync.dto.MaterialDTO;
import com.studentsync.entity.Material;
import com.studentsync.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    // Convert Material entity to MaterialDTO
    private MaterialDTO convertToDTO(Material material) {
        MaterialDTO dto = new MaterialDTO();
        dto.setId(material.getId());
        dto.setName(material.getName());
        dto.setDescription(material.getDescription());
        dto.setLink(material.getLink());
        return dto;
    }

    // Convert MaterialDTO to Material entity
    private Material convertToEntity(MaterialDTO dto) {
        Material material = new Material();
        material.setName(dto.getName());
        material.setDescription(dto.getDescription());
        material.setLink(dto.getLink());
        return material;
    }

    // Create a new Material
    public MaterialDTO createMaterial(MaterialDTO materialDTO) {
        Material material = convertToEntity(materialDTO);
        Material savedMaterial = materialRepository.save(material);
        return convertToDTO(savedMaterial);
    }

    // Get all Materials
    public List<MaterialDTO> getAllMaterials() {
        return materialRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Material by ID
    public Optional<MaterialDTO> getMaterialById(Long id) {
        return materialRepository.findById(id).map(this::convertToDTO);
    }

    // Update a Material
    public MaterialDTO updateMaterial(Long id, MaterialDTO materialDTO) {
        if (materialRepository.existsById(id)) {
            Material material = convertToEntity(materialDTO);
            material.setId(id); // Set the ID for update
            Material updatedMaterial = materialRepository.save(material);
            return convertToDTO(updatedMaterial);
        }
        return null; // Or throw an exception
    }

    // Delete a Material
    public void deleteMaterial(Long id) {
        materialRepository.deleteById(id);
    }
}
