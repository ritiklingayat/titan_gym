package com.example.titan_gym_backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainerResponse {

    private Long id;

    private String name;

    private String mobile;

    private Integer age;

    private String experience;

    private String address;

    private String photo;

    private String role;
}
