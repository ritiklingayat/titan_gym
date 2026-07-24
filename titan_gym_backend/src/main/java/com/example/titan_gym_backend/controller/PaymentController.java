package com.example.titan_gym_backend.controller;


import com.example.titan_gym_backend.dto.request.PaymentRequest;
import com.example.titan_gym_backend.dto.response.PaymentResponse;
import com.example.titan_gym_backend.service.PaymentService;

import lombok.RequiredArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {



    private final PaymentService paymentService;



    @PostMapping
    public ResponseEntity<PaymentResponse> addPayment(
            @RequestBody PaymentRequest request
    ){

        return new ResponseEntity<>(
                paymentService.addPayment(request),
                HttpStatus.CREATED
        );

    }




    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<PaymentResponse>> getPayments(
            @PathVariable Long memberId
    ){

        return ResponseEntity.ok(
                paymentService.getPaymentsByMember(memberId)
        );

    }

    @GetMapping
    public ResponseEntity<List<PaymentResponse>> getAllPayments(){

        return ResponseEntity.ok(
                paymentService.getAllPayments()
        );

    }

}