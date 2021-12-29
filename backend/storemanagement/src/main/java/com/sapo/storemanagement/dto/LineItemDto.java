package com.sapo.storemanagement.dto;

public class LineItemDto {
    private Long variantId;
    private Double price;
    private Long quantity;

    public Long getVariantId() {
        return variantId;
    }

    public Double getPrice() {
        return price;
    }

    public Long getQuantity() {
        return quantity;
    }
}
