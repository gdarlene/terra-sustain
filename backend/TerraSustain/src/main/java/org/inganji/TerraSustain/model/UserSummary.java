package org.inganji.TerraSustain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSummary {
        private Long id;
        private String firstName;
        private String lastName;
        private Integer points;
        private int rank;
        private Long totalReports;
}
