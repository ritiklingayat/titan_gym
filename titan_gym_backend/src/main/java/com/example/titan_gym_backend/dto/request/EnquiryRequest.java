package com.example.titan_gym_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnquiryRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter valid mobile number"
    )
    private String mobile;

    @NotBlank(message = "Plan is required")
    private String plan;

    @NotBlank(message = "Message is required")
    private String message;
}