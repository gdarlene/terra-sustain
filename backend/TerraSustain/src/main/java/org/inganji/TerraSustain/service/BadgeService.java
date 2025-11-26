package org.inganji.TerraSustain.service;

import jakarta.transaction.Transactional;
import org.inganji.TerraSustain.model.Badge;
import org.inganji.TerraSustain.model.BadgeCategory;
import org.inganji.TerraSustain.model.Person;
import org.inganji.TerraSustain.repository.BadgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@Transactional
public class BadgeService {
    @Autowired
    private BadgeRepository badgeRepository;

    public void updateBadgeIfNeeded(Person person) {
        int points = person.getPoints();
        BadgeCategory newCategory = BadgeCategory.fromPoints(points);

        Badge badge = person.getBadge();

        if (badge == null) {
            badge = new Badge(newCategory,person);
            badgeRepository.save(badge);
            person.setBadge(badge);
        } else if (badge.getCategory() != newCategory) {
            badge.setCategory(newCategory);
            badge.setEarnedDate(LocalDateTime.now());
            badgeRepository.save(badge);
        }
    }
}