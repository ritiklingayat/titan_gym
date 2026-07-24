package com.example.titan_gym_backend.service;

import com.example.titan_gym_backend.dto.request.TrainerRequest;
import com.example.titan_gym_backend.dto.response.TrainerResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TrainerService {

    TrainerResponse addTrainer(TrainerRequest request,
                               MultipartFile photo) throws IOException;

    List<TrainerResponse> getAllTrainers();

    TrainerResponse getTrainerById(Long id);

    TrainerResponse updateTrainer(Long id,
                                  TrainerRequest request,
                                  MultipartFile photo) throws IOException;

    void deleteTrainer(Long id);

}
