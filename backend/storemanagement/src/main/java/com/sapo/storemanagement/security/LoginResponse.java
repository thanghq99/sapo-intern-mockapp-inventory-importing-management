package com.sapo.storemanagement.security;

import java.io.Serializable;

public class LoginResponse implements Serializable {
    private String jwt;
    private String tokenType = "Bearer";

    public LoginResponse(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public String getTokenType() {
        return tokenType;
    }
}

