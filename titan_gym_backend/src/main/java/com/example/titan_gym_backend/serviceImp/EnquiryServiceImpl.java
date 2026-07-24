package com.example.titan_gym_backend.serviceImp;

import com.example.titan_gym_backend.dto.request.EnquiryRequest;
import com.example.titan_gym_backend.dto.response.EnquiryResponse;
import com.example.titan_gym_backend.entity.Enquiry;
import com.example.titan_gym_backend.repository.EnquiryRepository;
import com.example.titan_gym_backend.service.EnquiryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnquiryServiceImpl implements EnquiryService {

    private final EnquiryRepository enquiryRepository;

    private final ModelMapper modelMapper;

    @Override
    public EnquiryResponse addEnquiry(EnquiryRequest request) {

        Enquiry enquiry = new Enquiry();

        enquiry.setName(request.getName());
        enquiry.setMobile(request.getMobile());
        enquiry.setPlan(request.getPlan());
        enquiry.setMessage(request.getMessage());

        enquiry.setEnquiryDate(LocalDateTime.now());

        enquiry.setStatus("Pending");

        Enquiry saved = enquiryRepository.save(enquiry);

        return modelMapper.map(saved, EnquiryResponse.class);
    }

    @Override
    public List<EnquiryResponse> getAllEnquiries() {

        return enquiryRepository.findAll()
                .stream()
                .map(enquiry ->
                        modelMapper.map(enquiry, EnquiryResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteEnquiry(Long id) {

        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Enquiry not found"));

        enquiryRepository.delete(enquiry);
    }

    @Override
    public EnquiryResponse updateStatus(Long id, String status) {

        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));

        enquiry.setStatus(status);

        Enquiry updated = enquiryRepository.save(enquiry);

        return modelMapper.map(updated, EnquiryResponse.class);
    }
}