package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 32)
    @NotBlank(message = "Please input category name")
    @Size(max = 32, message = "Category name cannot exceed {max}")
    private String name;

    @Column(name = "description")
    @NotNull(message = "Description cannot be null")
    @Size(max = 255, message = "Category description cannot exceed {max}")
    private String description = "";

    public Category() {
    }

    public Category(String name) {
        this.name = name;
    }

    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}