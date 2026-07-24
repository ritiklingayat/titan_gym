package com.example.titan_gym_backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit mobile number")
    private String mobile;

    @NotNull(message = "Age is required")
    @Min(value = 10, message = "Age must be at least 10")
    @Max(value = 100, message = "Age must not exceed 100")
    private Integer age;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Trainer selection is required")
    private String trainer;

    private Long trainerId;

    @NotBlank(message = "Plan is required")
    private String planId;

    @NotNull(message = "Joining date is required")
    private LocalDate joinDate;

    @NotNull(message = "Paid amount is required")
    @PositiveOrZero(message = "Paid amount cannot be negative")
    private Double paidAmount;
}