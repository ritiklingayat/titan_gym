package com.example.titan_gym_backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainerRequest {

    @NotBlank(message = "Trainer name is required")
    private String name;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$",
            message = "Enter valid mobile number")
    private String mobile;

    @NotNull(message = "Age is required")
    @Min(18)
    @Max(80)
    private Integer age;

    @NotBlank(message = "Experience is required")
    private String experience;

    @NotBlank(message = "Address is required")
    private String address;
}
