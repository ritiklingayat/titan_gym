package com.example.titan_gym_backend.serviceImp;

import com.example.titan_gym_backend.dto.request.TrainerRequest;
import com.example.titan_gym_backend.dto.response.TrainerResponse;
import com.example.titan_gym_backend.entity.Trainer;
import com.example.titan_gym_backend.repository.TrainerRepository;
import com.example.titan_gym_backend.service.CloudinaryService;
import com.example.titan_gym_backend.service.TrainerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService {

    private final TrainerRepository trainerRepository;
    private final ModelMapper modelMapper;
    private final CloudinaryService cloudinaryService;

    @Override
    public TrainerResponse addTrainer(TrainerRequest request,
                                      MultipartFile photo) throws IOException {

        Trainer trainer = new Trainer();

        trainer.setName(request.getName());
        trainer.setMobile(request.getMobile());
        trainer.setAge(request.getAge());
        trainer.setExperience(request.getExperience());
        trainer.setAddress(request.getAddress());
        trainer.setRole("Fitness Trainer");

        if (photo != null && !photo.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(photo);
            trainer.setPhoto(imageUrl);
        }

        Trainer savedTrainer = trainerRepository.save(trainer);

        return modelMapper.map(savedTrainer, TrainerResponse.class);
    }

    @Override
    public List<TrainerResponse> getAllTrainers() {

        return trainerRepository.findAll()
                .stream()
                .map(trainer -> modelMapper.map(trainer, TrainerResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public TrainerResponse getTrainerById(Long id) {

        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Trainer not found with id : " + id));

        return modelMapper.map(trainer, TrainerResponse.class);
    }

    @Override
    public TrainerResponse updateTrainer(Long id,
                                         TrainerRequest request,
                                         MultipartFile photo) throws IOException {

        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Trainer not found with id : " + id));

        trainer.setName(request.getName());
        trainer.setMobile(request.getMobile());
        trainer.setAge(request.getAge());
        trainer.setExperience(request.getExperience());
        trainer.setAddress(request.getAddress());

        if (photo != null && !photo.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(photo);
            trainer.setPhoto(imageUrl);
        }

        Trainer updatedTrainer = trainerRepository.save(trainer);

        return modelMapper.map(updatedTrainer, TrainerResponse.class);
    }

    @Override
    public void deleteTrainer(Long id) {

        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Trainer not found with id : " + id));

        trainerRepository.delete(trainer);
    }
}
