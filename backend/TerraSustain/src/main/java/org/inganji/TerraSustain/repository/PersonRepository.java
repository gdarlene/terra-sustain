package org.inganji.TerraSustain.repository;

import org.inganji.TerraSustain.model.DTO.RegisterResponse;
import org.inganji.TerraSustain.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<RegisterResponse> findByUsernameOrPhoneNumberOrEmail(String username, String phoneNumber, String email);
}
