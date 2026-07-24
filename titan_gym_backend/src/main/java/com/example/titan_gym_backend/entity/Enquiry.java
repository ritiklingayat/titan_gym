package com.example.titan_gym_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "enquiries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 10)
    private String mobile;

    private String plan;

    @Column(length = 1000)
    private String message;

    private LocalDateTime enquiryDate;

    private String status;
}