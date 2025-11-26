package org.inganji.TerraSustain.model.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.inganji.TerraSustain.model.BadgeCategory;
import org.inganji.TerraSustain.model.Category;
import org.inganji.TerraSustain.model.Person;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportCreation {
    @NotBlank(message = "description required")
    private String issueDescription;
    private String mediaUrl;
    private String username;
    @NotNull(message = "please enter the category your report falls")
    private Category category;
    private Date submittedDate;
    private int earnedPoints;
    private BadgeCategory badgeCategory;
}