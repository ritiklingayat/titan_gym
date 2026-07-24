package com.example.titan_gym_backend.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponse {

    private Long id;

    private String name;

    private String mobile;

    private Integer age;

    private String address;

    private String gender;

    private String trainer;

    private Long trainerId;

    private String planId;

    private LocalDate joinDate;

    private Double paidAmount;

    private String photo;

    private String planName;

    private Double totalFee;

    private Double balance;

    private String status;

    private LocalDate expiryDate;

    // Payment History
    private List<PaymentResponse> payments;
}
