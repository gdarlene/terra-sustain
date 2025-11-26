package org.inganji.TerraSustain.model;

public enum BadgeCategory {
    BRONZE(0),
    SILVER(10),
    GOLD(50),
    PLATINUM(100);

    private final int minPoints;

    BadgeCategory(int minPoints) {
        this.minPoints = minPoints;
    }

    public int getMinPoints() {
        return minPoints;
    }
    public static BadgeCategory fromPoints(int points) {
        if (points >= 100) return PLATINUM;
        if (points >= 50) return GOLD;
        if (points >= 10)  return SILVER;
        return BRONZE;
    }

    public static BadgeCategory getNextBadge(int points) {
        if (points >= 100) return null;
        if (points >= 50) return PLATINUM;
        if (points >= 10)  return GOLD;
        if (points >= 0)   return SILVER;
        return BRONZE;
    }
}