package org.inganji.TerraSustain.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.inganji.TerraSustain.model.DTO.*;
import org.inganji.TerraSustain.model.Person;
import org.inganji.TerraSustain.model.UserSummary;
import org.inganji.TerraSustain.repository.IssueRepository;
import org.inganji.TerraSustain.repository.PersonRepository;
import org.inganji.TerraSustain.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@Service
public class PersonServiceImpl implements PersonService {
    @Autowired
    private IssueRepository issueRepo;
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
        person.setRole(registerRequest.getRole());
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
    public DashboardStatsResponse getDashboardStats(String username) {
        Long totalReports = issueRepo.countReportsByUsername(username);
        Person person = personRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int points = person.getPoints();

        return new DashboardStatsResponse(totalReports,points);
    }
    @Override
    public void deletePerson(Long id) {}

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
    public PersonProfileResponse getPersonInfo(String username) {
        Person person = personRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return getPersonInfo(person);
    }

    public PersonProfileResponse getPersonInfo(Person person) {
        PersonProfileResponse res = new PersonProfileResponse();
        res.setUsername(person.getUsername());
        res.setFirstName(person.getFirstName());
        res.setLastName(person.getLastName());
        res.setPhoneNumber(person.getPhoneNumber());
        res.setEmail(person.getEmail());
        res.setBio(person.getBio());
        return res;
    }
    public List<UserSummary> getTopActiveCitizens() {
        return personRepo.findAll(PageRequest.of(0, 20, Sort.by("points").descending()))
                .stream()
                .map(this::toUserSummary)
                .collect(Collectors.toList());
    }

    private UserSummary toUserSummary(Person p) {
        UserSummary u = new UserSummary();
        u.setId(p.getId());
        u.setUsername(p.getUsername());
        u.setPoints(p.getPoints());
        return u;
    }
}
