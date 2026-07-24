package com.example.titan_gym_backend.controller;

import com.example.titan_gym_backend.dto.request.MemberRequest;
import com.example.titan_gym_backend.dto.request.TrainerRequest;
import com.example.titan_gym_backend.dto.response.MemberResponse;
import com.example.titan_gym_backend.dto.response.TrainerResponse;
import com.example.titan_gym_backend.service.TrainerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@RequiredArgsConstructor
public class TrainerController {

    private final TrainerService trainerService;
    private final ObjectMapper objectMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrainerResponse> addTrainer(
            @RequestPart("trainer") String trainerJson,
            @RequestPart(value = "photo", required = false) MultipartFile photo)
            throws IOException {

        TrainerRequest request = objectMapper.readValue(trainerJson,TrainerRequest.class);


        TrainerResponse response = trainerService.addTrainer(request,photo);

        return new ResponseEntity<>(response, HttpStatus.CREATED);


    }

    @GetMapping
    public ResponseEntity<List<TrainerResponse>> getAllTrainers() {

        return ResponseEntity.ok(
                trainerService.getAllTrainers()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainerResponse> getTrainerById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                trainerService.getTrainerById(id)
        );
    }

    @PutMapping(value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TrainerResponse> updateTrainer(
            @PathVariable Long id,
            @RequestPart("trainer") String trainerJson,
            @RequestPart(value = "photo", required = false) MultipartFile photo)
            throws IOException {

        TrainerRequest request = objectMapper.readValue(trainerJson,TrainerRequest.class);


        return ResponseEntity.ok(
                trainerService.updateTrainer(id, request, photo)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrainer(
            @PathVariable Long id) {

        trainerService.deleteTrainer(id);

        return ResponseEntity.ok("Trainer deleted successfully.");
    }
}
