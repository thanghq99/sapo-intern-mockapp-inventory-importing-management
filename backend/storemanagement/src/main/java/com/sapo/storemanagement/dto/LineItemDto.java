package com.sapo.storemanagement.dto;

public class LineItemDto {
    private Long variantId;
    private String name;
    private Double price;
    private Long quantity;

    public LineItemDto(Long variantId, String name, Double price, Long quantity) {
        this.variantId = variantId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public Long getVariantId() {
        return variantId;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public Long getQuantity() {
        return quantity;
    }
}
