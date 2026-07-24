package com.example.titan_gym_backend.controller;

import com.example.titan_gym_backend.dto.request.MemberRequest;
import com.example.titan_gym_backend.dto.response.MemberResponse;
import com.example.titan_gym_backend.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MemberController {

    private final MemberService memberService;
    private final ObjectMapper objectMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MemberResponse> addMember(
            @RequestPart("member") String memberJson,
            @RequestPart(value = "photo", required = false) MultipartFile photo
    ) throws IOException {

        MemberRequest request = objectMapper.readValue(memberJson, MemberRequest.class);

        MemberResponse response = memberService.addMember(request, photo);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MemberResponse>> getAllMembers() {

        return ResponseEntity.ok(memberService.getAllMembers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> getMemberById(@PathVariable Long id) {

        return ResponseEntity.ok(memberService.getMemberById(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MemberResponse> updateMember(
            @PathVariable Long id,
            @RequestPart("member") String memberJson,
            @RequestPart(value = "photo", required = false) MultipartFile photo
    ) throws IOException {

        MemberRequest request = objectMapper.readValue(memberJson, MemberRequest.class);

        return ResponseEntity.ok(memberService.updateMember(id, request, photo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMember(@PathVariable Long id) {

        memberService.deleteMember(id);

        return ResponseEntity.ok("Member deleted successfully.");
    }
}
