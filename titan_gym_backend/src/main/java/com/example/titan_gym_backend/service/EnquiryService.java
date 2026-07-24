package com.example.titan_gym_backend.service;

import com.example.titan_gym_backend.dto.request.EnquiryRequest;
import com.example.titan_gym_backend.dto.response.EnquiryResponse;

import java.util.List;

public interface EnquiryService {

    EnquiryResponse addEnquiry(EnquiryRequest request);

    List<EnquiryResponse> getAllEnquiries();

    void deleteEnquiry(Long id);

    EnquiryResponse updateStatus(Long id, String status);
}