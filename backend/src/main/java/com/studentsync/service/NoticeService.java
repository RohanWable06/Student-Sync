package com.studentsync.service;

import com.studentsync.dto.NoticeDTO;
import com.studentsync.entity.Notice;
import com.studentsync.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    // Convert Notice entity to NoticeDTO
    private NoticeDTO convertToDTO(Notice notice) {
        NoticeDTO dto = new NoticeDTO();
        dto.setId(notice.getId());
        dto.setNoticeDate(notice.getNoticeDate());
        dto.setDescription(notice.getDescription());
        return dto;
    }

    // Convert NoticeDTO to Notice entity
    private Notice convertToEntity(NoticeDTO dto) {
        Notice notice = new Notice();
        notice.setNoticeDate(dto.getNoticeDate());
        notice.setDescription(dto.getDescription());
        return notice;
    }

    // Create a new Notice
    public NoticeDTO createNotice(NoticeDTO noticeDTO) {
        Notice notice = convertToEntity(noticeDTO);
        Notice savedNotice = noticeRepository.save(notice);
        return convertToDTO(savedNotice);
    }

    // Get all Notices
    public List<NoticeDTO> getAllNotices() {
        return noticeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Notice by ID
    public Optional<NoticeDTO> getNoticeById(Long id) {
        return noticeRepository.findById(id).map(this::convertToDTO);
    }

    // Update a Notice
    public NoticeDTO updateNotice(Long id, NoticeDTO noticeDTO) {
        if (noticeRepository.existsById(id)) {
            Notice notice = convertToEntity(noticeDTO);
            notice.setId(id); // Set the ID for update
            Notice updatedNotice = noticeRepository.save(notice);
            return convertToDTO(updatedNotice);
        }
        return null; // Or throw an exception
    }

    // Delete a Notice
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }
}
