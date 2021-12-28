package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
    name = "users",
    indexes = {
        @Index(name = "username", columnList = "username", unique = true),
        @Index(name = "email", columnList = "email", unique = true)
    }
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "username", nullable = false, unique = true, length = 32)
    @NotNull(message = "Username cannot be null")
    @Size(max = 32, message = "Username length cannot exceed {max}")
    private String username;

    @Column(name = "password", nullable = false)
    @NotNull(message = "Password cannot be null")
    @Size(min = 8, max = 255, message = "Ensure that password length is between {min} and {max}")
    private String password;

    @Column(name = "email", nullable = false, unique = true, length = 128)
    @NotBlank(message = "Email cannot be blank")
    @Email
    private String email;

    @ManyToMany
    @JoinTable(
        name = "user_role",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public User() {
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }
}