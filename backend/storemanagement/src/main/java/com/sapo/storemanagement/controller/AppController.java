package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.entities.AppUserDetails;
import com.sapo.storemanagement.entities.Role;
import com.sapo.storemanagement.entities.User;
import com.sapo.storemanagement.security.JwtTokenProvider;
import com.sapo.storemanagement.security.LoginRequest;
import com.sapo.storemanagement.security.LoginResponse;
import com.sapo.storemanagement.security.RegisterRequest;
import com.sapo.storemanagement.service.UserStaffService;
import com.sapo.storemanagement.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping
@CrossOrigin
public class AppController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private UserStaffService userStaffService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken((AppUserDetails) authentication.getPrincipal());
        User user = userStaffService.getUserByUsername(loginRequest.getUsername());
        Set<Role> role = user.getRoles();
        return new LoginResponse(jwt, role);
    }

    @PostMapping("/register")
    public void register(@Valid @RequestBody RegisterRequest registerRequest) {
        userService.createAdminAccount(registerRequest);
    }

}
