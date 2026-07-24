package com.example.titan_gym_backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnquiryResponse {

    private Long id;

    private String name;

    private String mobile;

    private String plan;

    private String message;

    private LocalDateTime enquiryDate;

    private String status;
}