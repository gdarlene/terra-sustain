package org.inganji.TerraSustain.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonProfileResponse {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phoneNumber;
    private String gender;
    private String role;
    private String bio;
}
