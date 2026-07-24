package com.example.titan_gym_backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {


    @NotNull(message = "Member id is required")
    private Long memberId;


    @NotNull(message = "Amount is required")
    private Double amount;


    private LocalDate paymentDate;


    private String paymentMode;

}