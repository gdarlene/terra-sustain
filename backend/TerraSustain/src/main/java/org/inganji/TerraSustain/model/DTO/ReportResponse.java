package org.inganji.TerraSustain.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportResponse {
    private Long id;
    private String issueDescription;
    private String mediaUrl;
    private String category;
    private Date submittedDate;
    private String username;
    private String province;
    private Integer likes;
    private Integer comments;
}
