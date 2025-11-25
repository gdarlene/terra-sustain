package org.inganji.TerraSustain.service.impl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.inganji.TerraSustain.model.Category;
import org.inganji.TerraSustain.model.DTO.ReportCreation;
import org.inganji.TerraSustain.model.DTO.ReportResponse;
import org.inganji.TerraSustain.model.Person;
import org.inganji.TerraSustain.model.Report;
import org.inganji.TerraSustain.repository.IssueRepository;
import org.inganji.TerraSustain.repository.PersonRepository;
import org.inganji.TerraSustain.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@Data
@AllArgsConstructor
@NoArgsConstructor
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
        int currentPoints = currentUser.getPoints();
        int points = calculatePointsBasedOnStrength(reportFromRequest.getCategory());
        currentPoints+=points;
        currentUser.setPoints(currentPoints);
        personRepo.save(currentUser);
        ReportCreation dto = toDto(savedReport);
        return dto;
    }
    private int calculatePointsBasedOnStrength(Category category){
        switch (category){
            case POLLUTION : return 5;
            case OVEREXPLOITATION : return 10;
            case HABITAT_DESTRUCTION : return 15;
            default : return 1;
        }
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
    public List<ReportResponse> getAllReportsForCommunity() {
        return issueRepo.findAll(Sort.by(Sort.Direction.DESC, "submittedDate"))
                .stream()
                .map(this::toCommunityDto)
                .collect(Collectors.toList());
    }

    public List<ReportResponse> searchReports(String query) {
        String likeQuery = "%" + query.toLowerCase() + "%";
        return issueRepo.searchReports(likeQuery)
                .stream()
                .map(this::toCommunityDto)
                .collect(Collectors.toList());
    }
    private ReportResponse toCommunityDto(Report report) {
        ReportResponse dto = new ReportResponse();
        dto.setId(report.getId());
        dto.setIssueDescription(report.getIssueDescription());
        dto.setMediaUrl(report.getMediaUrl());
        dto.setCategory(report.getCategory().name());
        dto.setSubmittedDate(report.getSubmittedDate());
        dto.setUsername(report.getPerson().getUsername());
        dto.setLikes(report.getLikes() != null ? report.getLikes().size() : 0);
        dto.setComments(report.getComments() != null ? report.getComments().size() : 0);
        return dto;
    }
}