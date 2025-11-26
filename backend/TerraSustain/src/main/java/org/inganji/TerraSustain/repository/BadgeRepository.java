package org.inganji.TerraSustain.repository;

import org.inganji.TerraSustain.model.Badge;
import org.inganji.TerraSustain.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
        Optional<Badge> findByPerson(Person person);
        Optional<Badge> findByPersonId(Long personId);
}
