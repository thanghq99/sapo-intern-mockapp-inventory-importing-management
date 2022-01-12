package com.sapo.storemanagement.dto;

import lombok.Getter;

@Getter
public class ProductDto {
    private String productName;

    private Long categoryId;
    private String brand;

    private Double weight;
    private String description;
    private String imageUrl;
}
