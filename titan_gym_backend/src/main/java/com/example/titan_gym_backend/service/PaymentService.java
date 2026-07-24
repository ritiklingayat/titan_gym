package com.example.titan_gym_backend.service;


import com.example.titan_gym_backend.dto.request.PaymentRequest;
import com.example.titan_gym_backend.dto.response.PaymentResponse;

import java.util.List;


public interface PaymentService {


    PaymentResponse addPayment(PaymentRequest request);

    List<PaymentResponse> getAllPayments();


    List<PaymentResponse> getPaymentsByMember(Long memberId);

}