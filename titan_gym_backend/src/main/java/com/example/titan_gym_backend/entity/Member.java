package com.example.titan_gym_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true, length = 10)
    private String mobile;

    private Integer age;

    private String gender;

    private String address;

    // Cloudinary Image URL
    private String photo;

    // with / without
    private String trainer;

    private Long trainerId;

    private String planId;

    private LocalDate joinDate;

    private Double paidAmount;

    @OneToMany(
            mappedBy = "member",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<Payment> payments;
}