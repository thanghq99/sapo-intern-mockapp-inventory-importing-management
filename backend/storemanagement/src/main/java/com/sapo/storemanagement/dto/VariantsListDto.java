package com.sapo.storemanagement.dto;
import java.util.List;

public class VariantsListDto {
    private String code;

    private List<String> color;
    private List<String> material;

    private Double retailPrice;
    private Double wholeSalePrice;
    private Double originalPrice;

    private Long inventoryQuantity;
    private Long sellableQuantity;

    public String getCode() { return code; }

    public List<String> getColor() { return color; }

    public List<String> getMaterial() { return material; }

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
