package org.inganji.TerraSustain.service;

import org.inganji.TerraSustain.model.DTO.RegisterRequest;
import org.inganji.TerraSustain.model.DTO.RegisterResponse;
import org.inganji.TerraSustain.model.DTO.PersonProfileUpdateResponse;
import org.inganji.TerraSustain.model.DTO.PersonProfileUpdateRequest;
import org.inganji.TerraSustain.model.Person;

import java.util.Optional;

public interface PersonService {
    RegisterResponse createPerson(RegisterRequest registerRequest);
    void deletePerson(Long id);
    PersonProfileUpdateResponse updatePerson(PersonProfileUpdateRequest personProfileUpdateRequest);
    RegisterResponse getAllPeople();
    Optional<Person> findPersonByUsername(String username);
}
