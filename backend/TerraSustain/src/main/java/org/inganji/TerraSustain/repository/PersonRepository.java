package org.inganji.TerraSustain.repository;

import org.inganji.TerraSustain.model.DTO.RegisterResponse;
import org.inganji.TerraSustain.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    @Query("SELECT p FROM Person p WHERE p.username = :input OR p.email = :input OR p.phoneNumber = :input")
    Optional<Person> findByUsernameOrPhoneNumberOrEmail(@Param("input") String input);
}
