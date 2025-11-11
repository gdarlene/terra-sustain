package org.inganji.TerraSustain.service.impl;

import org.inganji.TerraSustain.model.DTO.PersonProfileUpdateRequest;
import org.inganji.TerraSustain.model.DTO.PersonProfileUpdateResponse;
import org.inganji.TerraSustain.model.DTO.RegisterRequest;
import org.inganji.TerraSustain.model.DTO.RegisterResponse;
import org.inganji.TerraSustain.repository.PersonRepository;
import org.inganji.TerraSustain.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl implements PersonService {
    @Autowired
    private PersonRepository personRepo;
    @Override
    public RegisterResponse createPerson(RegisterRequest registerRequest) {
        return null;
    }

    @Override
    public void deletePerson(Long id) {

    }

    @Override
    public PersonProfileUpdateResponse updatePerson(PersonProfileUpdateRequest personProfileUpdateRequest) {
        return null;
    }

    @Override
    public RegisterResponse getAllPeople() {
        return null;
    }
}
