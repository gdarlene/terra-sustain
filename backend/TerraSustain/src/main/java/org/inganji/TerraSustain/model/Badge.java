package org.inganji.TerraSustain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime earnedDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BadgeCategory category;
    @OneToOne
    @JoinColumn(name = "person_id", unique = true, nullable = false)
    private Person person;
    public Badge(BadgeCategory category, Person person) {
        this.category = category;
        this.person = person;
        this.earnedDate = LocalDateTime.now();
    }
}