package com.sapo.storemanagement.security;

import com.sapo.storemanagement.entities.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class RegisterRequest {
    @NotNull(message = "Username cannot be null")
    @Size(max = 32, message = "Username length cannot exceed {max}")
    private String username;

    @NotNull(message = "Password cannot be null")
    @Size(min = 8, max = 255, message = "Ensure that password length is between {min} and {max}")
    private String password;

    @NotBlank(message = "Email cannot be blank")
    @Email
    private String email;

    @NotNull(message = "Role cannot be blank")
    private String role;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getRole(){ return role;}
}
