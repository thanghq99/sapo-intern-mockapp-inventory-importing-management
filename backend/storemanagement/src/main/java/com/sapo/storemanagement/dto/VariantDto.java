package com.sapo.storemanagement.dto;

import java.util.List;

public class VariantDto {
    private String variantCode;

    private String unit;
    private String size;
    private String color;
    private String material;

    private Double retailPrice;
    private Double wholeSalePrice;
    private Double originalPrice;

    private Long inventoryQuantity;
    private Long sellableQuantity;

    public String getVariantCode() { return variantCode; }

    public String getSize() { return size; }

    public String getUnit() { return unit; }

    public String getColor() { return color; }

    public String getMaterial() { return material; }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public Double getWholeSalePrice() {
        return wholeSalePrice;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public Long getInventoryQuantity() {
        return inventoryQuantity;
    }

    public Long getSellableQuantity() {
        return sellableQuantity;
    }
}
