package org.inganji.TerraSustain.repository;

import org.inganji.TerraSustain.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IssueRepository extends JpaRepository<Report, Long> {
    @Query("SELECT COUNT(r) FROM Report r WHERE r.person.username = :username")
    long countReportsByUsername(@Param("username") String username);
    @Query("SELECT r FROM Report r WHERE LOWER(r.issueDescription) LIKE LOWER(:query) OR LOWER(r.person.username) " +
            "LIKE LOWER(:query) ORDER BY r.submittedDate DESC")
    List<Report> searchReports(@Param("query") String query);
}