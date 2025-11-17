package org.inganji.TerraSustain.model.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.inganji.TerraSustain.model.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    @NotBlank
    @Size(min = 6, max = 30, message = "first name should have characters above or equal ot 6 and not greater than 30")
    private String firstName;
    @Size(min = 6, max = 30, message = "last name should have characters above or equal ot 6 and not greater than 30")
    @NotBlank
    private String lastName;
    @NotBlank
    @Size(min = 8, max = 255, message = "password should have characters above or equal ot 8 and not greater than 20")
    private String password;
    @NotBlank
    @Size(min = 6, max = 30, message = "username should have characters above or equal ot 6 and not greater than 30")
    private String username;
    @Size(min = 10, max = 13, message = "phone number should not go below 10 characters or beyond 13 characters")
    @NotBlank
    private String phoneNumber;
    @NotNull
    private Role role;
}
