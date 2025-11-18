package org.inganji.TerraSustain.repository;

import org.inganji.TerraSustain.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IssueRepository extends JpaRepository<Report, Long> {
    @Query("SELECT COUNT(r) FROM Report r WHERE r.person.username = :username")
    long countReportsByUsername(@Param("username") String username);

}