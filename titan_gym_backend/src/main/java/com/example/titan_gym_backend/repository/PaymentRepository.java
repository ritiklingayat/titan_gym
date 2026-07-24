package com.example.titan_gym_backend.repository;


import com.example.titan_gym_backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PaymentRepository extends JpaRepository<Payment, Long> {


    List<Payment> findByMemberId(Long memberId);

}