package org.inganji.TerraSustain.service.impl;

import org.inganji.TerraSustain.model.DTO.ReportCreation;
import org.inganji.TerraSustain.model.Person;
import org.inganji.TerraSustain.model.Report;
import org.inganji.TerraSustain.repository.IssueRepository;
import org.inganji.TerraSustain.repository.PersonRepository;
import org.inganji.TerraSustain.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ReportServiceImp implements ReportService {
    @Autowired
    private PersonRepository personRepo;
    @Autowired
    private IssueRepository issueRepo;
    public ReportCreation createReport(Report reportFromRequest) {
        Person currentUser = getCurrentAuthenticatedPerson();
        reportFromRequest.setPerson(currentUser);
        reportFromRequest.setSubmittedDate(new Date());
        Report savedReport = issueRepo.save(reportFromRequest);
        return toDto(savedReport);
    }
    private ReportCreation toDto(Report report) {
        ReportCreation dto = new ReportCreation();
        dto.setCategory(report.getCategory());
        dto.setIssueDescription(report.getIssueDescription());
        dto.setMediaUrl(report.getMediaUrl());
        dto.setSubmittedDate(report.getSubmittedDate());
        dto.setUsername(report.getPerson() != null ? report.getPerson().getUsername() : null);

        return dto;
    }
    private Person getCurrentAuthenticatedPerson() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            throw new UsernameNotFoundException("User not authenticated");
        }

        String username = authentication.getName();
        return personRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
    public void deleteReport(Long id) {
        issueRepo.deleteById(id);
    }
}