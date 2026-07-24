package com.example.titan_gym_backend.service;

import com.example.titan_gym_backend.dto.request.MemberRequest;
import com.example.titan_gym_backend.dto.response.MemberResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MemberService {

    MemberResponse addMember(MemberRequest request, MultipartFile photo) throws IOException;

    List<MemberResponse> getAllMembers();

    MemberResponse getMemberById(Long id);

    MemberResponse updateMember(Long id, MemberRequest request, MultipartFile photo) throws IOException;

    void deleteMember(Long id);

}
