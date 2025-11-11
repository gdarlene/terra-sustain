package org.inganji.TerraSustain.controller;

import jakarta.validation.Valid;
import org.inganji.TerraSustain.model.DTO.*;
import org.inganji.TerraSustain.model.Person;
import org.inganji.TerraSustain.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {
    @Autowired
    private PersonService personService;
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register (@Valid RegisterRequest registerRequest) {
        RegisterResponse res = new RegisterResponse();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login (@Valid AuthenticationRequest req) {
        AuthenticationResponse res = new AuthenticationResponse();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deletePerson(@RequestBody @PathVariable Person person) {
        return new ResponseEntity<>("person deleted", HttpStatus.OK);
    }
    @PostMapping("/update/{id}")
    public ResponseEntity<PersonProfileUpdateResponse> updatePerson(@PathVariable @Valid @RequestBody
                                   PersonProfileUpdateRequest personProfileUpdateRequest) {
        PersonProfileUpdateResponse res = new PersonProfileUpdateResponse();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}