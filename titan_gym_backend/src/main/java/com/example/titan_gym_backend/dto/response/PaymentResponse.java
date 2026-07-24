package com.example.titan_gym_backend.dto.response;

import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {


    private Long id;


    private Double amount;

    private String memberName;

    private LocalDate paymentDate;


    private String paymentMode;

}