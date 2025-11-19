package org.inganji.TerraSustain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSummary {
        private Long id;
        private String username;
        private String province;
        private Integer points;
        private String avatarUrl;
}
