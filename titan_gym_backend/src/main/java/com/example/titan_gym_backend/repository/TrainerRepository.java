package com.example.titan_gym_backend.repository;

import com.example.titan_gym_backend.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {

}
