package com.sapo.storemanagement.security;

import com.sapo.storemanagement.entities.Role;

import java.io.Serializable;
import java.util.Set;

public class LoginResponse implements Serializable {
    private String jwt;
    private Set<Role> role;
    private String tokenType = "Bearer";

    public LoginResponse(String jwt, Set<Role> role) {
        this.jwt = jwt;
        this.role = role;
    }

    public Set<Role> getRole() {
        return role;
    }

    public String getJwt() {
        return jwt;
    }

    public String getTokenType() {
        return tokenType;
    }
}

