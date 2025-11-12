package org.inganji.TerraSustain.service.impl;

import org.inganji.TerraSustain.configuration.CustomUserDetails;
import org.inganji.TerraSustain.model.DTO.RegisterResponse;
import org.inganji.TerraSustain.model.Person;
import org.inganji.TerraSustain.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private PersonRepository personRepo;
    @Override
    public UserDetails loadUserByUsername(String usernameInput) throws UsernameNotFoundException {
        Optional<RegisterResponse> person= personRepo.findByUsernameOrPhoneNumberOrEmail(usernameInput);
        if(person.isPresent()){
            return new CustomUserDetails(person.get());
        }
        else{
            throw new UsernameNotFoundException("User with these credentials not found"+usernameInput+" Not Found");
        }
        return null;
    }
}
