package com.example.titan_gym_backend.repository;

import com.example.titan_gym_backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
