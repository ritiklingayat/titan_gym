package com.example.titan_gym_backend.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trainers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true, length = 10)
    private String mobile;

    private Integer age;

    private String experience;

    private String address;

    // Cloudinary Image URL
    private String photo;

    @Builder.Default
    private String role = "Fitness Trainer";
}