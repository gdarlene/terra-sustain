package org.inganji.TerraSustain.service.impl;

import jakarta.transaction.Transactional;
import org.inganji.TerraSustain.model.DTO.PersonProfileUpdateRequest;
import org.inganji.TerraSustain.model.DTO.PersonProfileUpdateResponse;
import org.inganji.TerraSustain.model.DTO.RegisterRequest;
import org.inganji.TerraSustain.model.DTO.RegisterResponse;
import org.inganji.TerraSustain.model.Person;
import org.inganji.TerraSustain.repository.PersonRepository;
import org.inganji.TerraSustain.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private PersonRepository personRepo;
    @Transactional
    @Override
    public RegisterResponse createPerson(RegisterRequest registerRequest) {
        if(personRepo.findByUsername(registerRequest.getUsername()).isPresent()){
            throw new IllegalArgumentException("user already exists");
        }
        Person person = new Person();
        person.setUsername(registerRequest.getUsername());
        person.setPassword(encoder.encode(registerRequest.getPassword()));
        person.setPhoneNumber(registerRequest.getPhoneNumber());
        person.setFirstName(registerRequest.getFirstName());
        person.setLastName(registerRequest.getLastName());
        person.setRole(Collections.singleton(registerRequest.getRole()));
        Person savedPerson = personRepo.save(person);
        return toResponse(savedPerson);
    }

    private RegisterResponse toResponse(Person savedPerson) {
        RegisterResponse res = new RegisterResponse();
        res.setUsername(savedPerson.getUsername());
        res.setFirstName(savedPerson.getFirstName());
        res.setLastName(savedPerson.getLastName());
        res.setPhoneNumber(savedPerson.getPhoneNumber());
        return res;
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

    @Override
    public Optional<Person> findPersonByUsername(String username) {
        return personRepo.findByUsername(username);

    }
}
