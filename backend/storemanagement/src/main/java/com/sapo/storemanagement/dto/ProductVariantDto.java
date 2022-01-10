package com.sapo.storemanagement.dto;

import java.util.List;

public class ProductVariantDto {
    private String productName;
    private Long productId;

    private Long categoryId;
    private String brand;

    private Double weight;
    private String unit;
    private String description;
    private String variantCode;
    private String imageUrl;

    private Double retailPrice;
    private Double wholeSalePrice;
    private Double originalPrice;

    private List<String> size;
    private List<String> color;
    private List<String> material;

    private Long inventoryQuantity;
    private Long sellableQuantity;

    public String getProductName() {
        return productName;
    }

    public Long getProductId() { return productId; }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getBrand() {
        return brand;
    }

    public Double getWeight() {
        return weight;
    }

    public String getUnit() {
        return unit;
    }

    public String getDescription() {
        return description;
    }

    public String getVariantCode() {
        return variantCode;
    }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public Double getWholeSalePrice() {
        return wholeSalePrice;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public List<String> getColor() {
        return color;
    }

    public List<String> getMaterial() {
        return material;
    }

    public List<String> getSize() {
        return size;
    }

    public Long getInventoryQuantity() {
        return inventoryQuantity;
    }

    public Long getSellableQuantity() {
        return sellableQuantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
