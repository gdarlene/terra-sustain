package org.inganji.TerraSustain.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.inganji.TerraSustain.configuration.JwtUtil;
import org.inganji.TerraSustain.model.DTO.*;
import org.inganji.TerraSustain.model.Person;
import org.inganji.TerraSustain.model.UserSummary;
import org.inganji.TerraSustain.service.PersonService;
import org.inganji.TerraSustain.service.impl.CustomUserDetailsService;
import org.inganji.TerraSustain.service.impl.PersonServiceImpl;
import org.inganji.TerraSustain.service.impl.ReportServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Data
@RestController
public class PersonController {
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private PersonServiceImpl personService;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ReportServiceImp reportService;

    @PostMapping("/register")
    public ResponseEntity<?> register (@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            personService.createPerson(registerRequest);
            return ResponseEntity.ok("registration successful");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthenticationRequest request) {
        try {
            // Authenticatation with Spring Security
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            String jwt = jwtUtil.generateToken(userDetails);
            Optional<Person> person = Optional.ofNullable(personService.findPersonByUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found")));
            if(person.isPresent()){
                AuthenticationResponse response = new AuthenticationResponse();
                response.setToken(jwt);
                response.setUsername(person.get().getUsername());
                response.setFirstName(person.get().getFirstName());
                response.setLastName(person.get().getLastName());
                response.setRole(person.get().getRole().name());
                return ResponseEntity.ok(response);
            }
            else{
                throw new UsernameNotFoundException("Invalid email or password");
            }
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid username or password"));
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ApiResponse(false, "Account is disabled"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Login failed: " + e.getMessage()));
        }
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
    @GetMapping("/citizen/stats")
    public ResponseEntity<?> getDashboardStats(Authentication authentication) {
        String username = authentication.getName();
        DashboardStatsResponse stats = (personService.getDashboardStats(username));
        return ResponseEntity.ok(stats);
    }
    @GetMapping("/citizen/profile/")
    public ResponseEntity<PersonProfileResponse> getProfile(Authentication authentication) {
        String username = authentication.getName();
        PersonProfileResponse profile = personService.getPersonInfo(username);
        return ResponseEntity.ok(profile);
    }
    @GetMapping("/reports")
    public ResponseEntity<List<ReportResponse>> getAllReports() {
        List<ReportResponse> reports = reportService.getAllReportsForCommunity();
        return ResponseEntity.ok(reports);
    }
    @GetMapping("/members")
    public ResponseEntity<List<UserSummary>> getCommunityMembers() {
        List<UserSummary> members = personService.getTopActiveCitizens();
        return ResponseEntity.ok(members);
    }
    @GetMapping("/search")
    public ResponseEntity<List<ReportResponse>> searchReports(
            @RequestParam String q) {
        return ResponseEntity.ok(reportService.searchReports(q));
    }
}