package com.example.titan_gym_backend.serviceImp;

import com.example.titan_gym_backend.dto.request.MemberRequest;
import com.example.titan_gym_backend.dto.response.MemberResponse;
import com.example.titan_gym_backend.dto.response.PaymentResponse;

import com.example.titan_gym_backend.entity.Member;
import com.example.titan_gym_backend.entity.Payment;

import com.example.titan_gym_backend.repository.MemberRepository;
import com.example.titan_gym_backend.repository.PaymentRepository;

import com.example.titan_gym_backend.service.CloudinaryService;
import com.example.titan_gym_backend.service.MemberService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PaymentRepository paymentRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public MemberResponse addMember(
            MemberRequest request,
            MultipartFile photo
    ) throws IOException {

        validatePlanAndTrainer(request);

        Member member = new Member();

        member.setName(request.getName());
        member.setMobile(request.getMobile());
        member.setAge(request.getAge());
        member.setAddress(request.getAddress());
        member.setGender(request.getGender());
        member.setTrainer(request.getTrainer());
        member.setTrainerId(request.getTrainerId());
        member.setPlanId(request.getPlanId());
        member.setJoinDate(request.getJoinDate());
        member.setPaidAmount(request.getPaidAmount());

        if (photo != null && !photo.isEmpty()) {
            member.setPhoto(
                    cloudinaryService.uploadImage(photo)
            );
        }

        Member saved = memberRepository.save(member);

        if (
                request.getPaidAmount() != null &&
                request.getPaidAmount() > 0
        ) {
            Payment payment = Payment.builder()
                    .member(saved)
                    .amount(request.getPaidAmount())
                    .paymentDate(LocalDate.now())
                    .paymentMode("Cash")
                    .build();

            paymentRepository.save(payment);
        }

        return convertToResponse(saved);
    }

    @Override
    public List<MemberResponse> getAllMembers() {
        return memberRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MemberResponse getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Member not found")
                );

        return convertToResponse(member);
    }

    @Override
    public MemberResponse updateMember(
            Long id,
            MemberRequest request,
            MultipartFile photo
    ) throws IOException {

        validatePlanAndTrainer(request);

        Member member = memberRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Member not found")
                );

        member.setName(request.getName());
        member.setMobile(request.getMobile());
        member.setAge(request.getAge());
        member.setAddress(request.getAddress());
        member.setGender(request.getGender());
        member.setTrainer(request.getTrainer());
        member.setTrainerId(request.getTrainerId());
        member.setPlanId(request.getPlanId());
        member.setJoinDate(request.getJoinDate());
        member.setPaidAmount(request.getPaidAmount());

        if (photo != null && !photo.isEmpty()) {
            member.setPhoto(
                    cloudinaryService.uploadImage(photo)
            );
        }

        Member updated = memberRepository.save(member);

        return convertToResponse(updated);
    }

    @Override
    public void deleteMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Member not found")
                );

        memberRepository.delete(member);
    }

    private MemberResponse convertToResponse(Member member) {
        double totalFee = getPlanPrice(member.getPlanId());

        double paidAmount =
                member.getPaidAmount() == null
                        ? 0
                        : member.getPaidAmount();

        double balance = Math.max(
                totalFee - paidAmount,
                0
        );

        LocalDate expiryDate =
                member.getJoinDate()
                        .plusMonths(
                                getPlanMonths(
                                        member.getPlanId()
                                )
                        );

        String status;

        if (LocalDate.now().isAfter(expiryDate)) {
            status = "Expired";
        } else if (balance > 0) {
            status = "Pending";
        } else {
            status = "Active";
        }

        List<PaymentResponse> payments =
                paymentRepository
                        .findByMemberId(member.getId())
                        .stream()
                        .map(this::convertPayment)
                        .collect(Collectors.toList());

        return MemberResponse.builder()
                .id(member.getId())
                .name(member.getName())
                .mobile(member.getMobile())
                .age(member.getAge())
                .address(member.getAddress())
                .gender(member.getGender())
                .trainer(member.getTrainer())
                .trainerId(member.getTrainerId())
                .planId(member.getPlanId())
                .planName(
                        getPlanName(member.getPlanId())
                )
                .joinDate(member.getJoinDate())
                .expiryDate(expiryDate)
                .paidAmount(paidAmount)
                .totalFee(totalFee)
                .balance(balance)
                .status(status)
                .photo(member.getPhoto())
                .payments(payments)
                .build();
    }

    private PaymentResponse convertPayment(
            Payment payment
    ) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .amount(payment.getAmount())
                .paymentDate(
                        payment.getPaymentDate()
                )
                .paymentMode(
                        payment.getPaymentMode()
                )
                .build();
    }

    private void validatePlanAndTrainer(
            MemberRequest request
    ) {
        String planId = request.getPlanId();
        String trainerSelection =
                request.getTrainer();

        boolean trainerPlan =
                isTrainerPlan(planId);

        if (
                "with".equalsIgnoreCase(
                        trainerSelection
                ) &&
                !trainerPlan
        ) {
            throw new IllegalArgumentException(
                    "Please select a plan that includes a trainer"
            );
        }

        if (
                "without".equalsIgnoreCase(
                        trainerSelection
                ) &&
                trainerPlan
        ) {
            throw new IllegalArgumentException(
                    "Trainer plans require trainer selection"
            );
        }

        if (
                "with".equalsIgnoreCase(
                        trainerSelection
                ) &&
                request.getTrainerId() == null
        ) {
            throw new IllegalArgumentException(
                    "Please select a trainer"
            );
        }

        getPlanPrice(planId);
    }

    private boolean isTrainerPlan(String planId) {
        return switch (planId) {
            case "pt_cardio_monthly",
                 "pt_monthly",
                 "pt_yearly" -> true;

            case "monthly_basic",
                 "monthly",
                 "quarterly",
                 "halfyearly" -> false;

            default -> throw new IllegalArgumentException(
                    "Invalid membership plan: " + planId
            );
        };
    }

    private String getPlanName(String planId) {
        return switch (planId) {
            case "monthly_basic" ->
                    "1 Month Without Cardio";

            case "monthly" ->
                    "1 Month With Cardio";

            case "quarterly" ->
                    "3 Month Plan";

            case "halfyearly" ->
                    "6 Month Plan";

            case "pt_cardio_monthly" ->
                    "1 Month With Trainer and Cardio";

            case "pt_monthly" ->
                    "One Month General P.T.";

            case "pt_yearly" ->
                    "One Month P.T.";

            default -> throw new IllegalArgumentException(
                    "Invalid membership plan: " + planId
            );
        };
    }

    private double getPlanPrice(String planId) {
        return switch (planId) {
            case "monthly_basic" -> 600;

            case "monthly" -> 1399;

            case "quarterly" -> 6500;

            case "halfyearly" -> 12000;

            case "pt_cardio_monthly" -> 1600;

            case "pt_monthly" -> 2399;

            case "pt_yearly" -> 5000;

            default -> throw new IllegalArgumentException(
                    "Invalid membership plan: " + planId
            );
        };
    }

    private int getPlanMonths(String planId) {
        return switch (planId) {
            case "monthly_basic",
                 "monthly",
                 "pt_cardio_monthly",
                 "pt_monthly",
                 "pt_yearly" -> 1;

            case "quarterly" -> 3;

            case "halfyearly" -> 6;

            default -> throw new IllegalArgumentException(
                    "Invalid membership plan: " + planId
            );
        };
    }
}