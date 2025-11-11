package org.inganji.TerraSustain.repository;

import org.inganji.TerraSustain.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
