package org.inganji.TerraSustain.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name= "position")
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date earnDate;
    private BadgeCategory category;
}