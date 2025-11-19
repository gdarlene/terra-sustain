package org.inganji.TerraSustain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "likes")
public class Like {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "person_id", nullable = false)
        private Person person;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "report_id", nullable = false)
        private Report report;

        @Column(nullable = false)
        private LocalDateTime likedAt = LocalDateTime.now();
}