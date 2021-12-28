package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 64)
    @NotBlank(message = "Product name cannot be blank")
    @Size(max = 64, message = "Product name length cannot exceed {max}")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "brand", length = 32)
    @NotNull(message = "Brand name cannot be null")
    @Size(max = 32, message = "Brand name length cannot exceed {max}")
    private String brand;

    @Column(name = "description")
    @NotNull(message = "Product description cannot be null")
    @Size(max = 255, message = "Product description length cannot exceed {max}")
    private String description;

    @Column(name = "image_url", nullable = false)
    @NotBlank(message = "Image URL cannot be blank")
    @Size(max = 255, message = "Image URL length cannot exceed {max}")
    private String imageUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Product() {
    }

    public Product(String name, Category category, String imageUrl) {
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.imageUrl = imageUrl;
    }

    public Product(String name, Category category, String brand,
                   String description, String imageUrl) {
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setBrand(String brand) { this.brand = brand; }

    public String getBrand() {
        return brand;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    private void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}