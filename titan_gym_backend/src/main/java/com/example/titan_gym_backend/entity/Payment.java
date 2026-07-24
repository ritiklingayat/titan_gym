package com.example.titan_gym_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    private String paymentMode;

    private LocalDate paymentDate;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;









}