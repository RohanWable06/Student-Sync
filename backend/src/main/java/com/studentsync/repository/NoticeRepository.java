package com.studentsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentsync.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

}
