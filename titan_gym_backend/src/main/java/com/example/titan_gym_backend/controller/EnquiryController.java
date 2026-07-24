package com.example.titan_gym_backend.controller;

import com.example.titan_gym_backend.dto.request.EnquiryRequest;
import com.example.titan_gym_backend.dto.response.EnquiryResponse;
import com.example.titan_gym_backend.service.EnquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EnquiryController {

    private final EnquiryService enquiryService;

    @PostMapping
    public ResponseEntity<EnquiryResponse> addEnquiry(
            @Valid @RequestBody EnquiryRequest request) {

        return new ResponseEntity<>(
                enquiryService.addEnquiry(request),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<EnquiryResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return ResponseEntity.ok(
                enquiryService.updateStatus(id, status)
        );

    }

    @GetMapping
    public ResponseEntity<List<EnquiryResponse>> getAllEnquiries() {

        return ResponseEntity.ok(
                enquiryService.getAllEnquiries()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEnquiry(
            @PathVariable Long id) {

        enquiryService.deleteEnquiry(id);

        return ResponseEntity.ok("Enquiry deleted successfully.");
    }
}