package org.inganji.TerraSustain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.inganji.TerraSustain.model.DTO.IssueStatus;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "issue")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "description")
    private String issueDescription;
    @Column(name="resource_url")
    private String mediaUrl;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="person_id")
    private Person  person;
    @Enumerated(EnumType.STRING)
    private Category category;
    private Date submittedDate;
    @Enumerated(EnumType.STRING)
    private IssueStatus status;
}