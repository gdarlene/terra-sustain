package org.inganji.TerraSustain.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterResponse {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String username;
}
