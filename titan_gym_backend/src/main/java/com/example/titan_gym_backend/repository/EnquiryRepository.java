package com.example.titan_gym_backend.repository;

import com.example.titan_gym_backend.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
}