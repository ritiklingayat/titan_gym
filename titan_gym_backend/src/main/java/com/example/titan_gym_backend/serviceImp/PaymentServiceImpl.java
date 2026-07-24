package com.example.titan_gym_backend.serviceImp;


import com.example.titan_gym_backend.dto.request.PaymentRequest;
import com.example.titan_gym_backend.dto.response.PaymentResponse;
import com.example.titan_gym_backend.entity.Member;
import com.example.titan_gym_backend.entity.Payment;
import com.example.titan_gym_backend.repository.MemberRepository;
import com.example.titan_gym_backend.repository.PaymentRepository;
import com.example.titan_gym_backend.service.PaymentService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {


    private final PaymentRepository paymentRepository;

    private final MemberRepository memberRepository;



    @Override
    public PaymentResponse addPayment(PaymentRequest request) {

        Member member = memberRepository.findById(request.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // Create payment record
        Payment payment = Payment.builder()
                .member(member)
                .amount(request.getAmount())
                .paymentDate(
                        request.getPaymentDate() != null
                                ? request.getPaymentDate()
                                : LocalDate.now()
                )
                .paymentMode(request.getPaymentMode())
                .build();

        Payment saved = paymentRepository.save(payment);

        // Update member's total paid amount
        double currentPaid = member.getPaidAmount() == null ? 0.0 : member.getPaidAmount();

        member.setPaidAmount(currentPaid + request.getAmount());

        memberRepository.save(member);

        return mapToResponse(saved);
    }





    @Override
    public List<PaymentResponse> getPaymentsByMember(Long memberId) {


        return paymentRepository
                .findByMemberId(memberId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

    }





    private PaymentResponse mapToResponse(Payment payment){


        return PaymentResponse.builder()

                .id(payment.getId())

                .amount(payment.getAmount())

                .paymentDate(payment.getPaymentDate())

                .paymentMode(payment.getPaymentMode())

                .memberName(
                        payment.getMember().getName()
                )

                .build();


    }

    @Override
    public List<PaymentResponse> getAllPayments(){


        return paymentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());


    }

}