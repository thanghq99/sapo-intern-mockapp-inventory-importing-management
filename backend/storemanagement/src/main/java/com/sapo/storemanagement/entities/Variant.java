package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "variants", indexes = {
    @Index(name = "variants_code_unique", columnList = "code", unique = true),
    @Index(name = "variants_product_id_foreign", columnList = "product_id")
})
public class Variant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "code", nullable = false, unique = true, length = 16)
    private String code;

    @Column(name = "inventory_quantity", nullable = false)
    private Long inventoryQuantity;

    @Column(name = "sellable_quantity", nullable = false)
    private Long sellableQuantity;

    @Column(name = "size", length = 8)
    private String size = "";

    @Column(name = "color", length = 16)
    private String color = "";

    @Column(name = "material", length = 32)
    private String material = "";

    @Column(name = "unit", length = 16)
    private String unit = "";

    @Column(name = "original_price", nullable = false)
    private Double originalPrice;

    @Column(name = "whole_sale_price", nullable = false)
    private Double wholeSalePrice;

    @Column(name = "retail_price", nullable = false)
    private Double retailPrice;

    @Column(name = "record_status", length = 32)
    private RecordStatus recordStatus = RecordStatus.ACTIVE;

    public Variant() {
    }

    public Variant(Product product, String code, Long inventoryQuantity,
                   Long sellableQuantity, Double originalPrice,
                   Double wholeSalePrice, Double retailPrice) {
        this.product = product;
        this.code = code;
        this.inventoryQuantity = inventoryQuantity;
        this.sellableQuantity = sellableQuantity;
        this.originalPrice = originalPrice;
        this.wholeSalePrice = wholeSalePrice;
        this.retailPrice = retailPrice;
    }

    public Variant(Product product, String code, Long inventoryQuantity,
                   Long sellableQuantity, String size, String color,
                   String material, String unit, Double originalPrice,
                   Double wholeSalePrice, Double retailPrice) {
        this.product = product;
        this.code = code;
        this.inventoryQuantity = inventoryQuantity;
        this.sellableQuantity = sellableQuantity;
        this.size = size;
        this.color = color;
        this.material = material;
        this.unit = unit;
        this.originalPrice = originalPrice;
        this.wholeSalePrice = wholeSalePrice;
        this.retailPrice = retailPrice;
    }

    public Long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public String getCode() {
        return code;
    }

    public Long getInventoryQuantity() {
        return inventoryQuantity;
    }

    public void setInventoryQuantity(@NotNull Long inventoryQuantity) {
        this.inventoryQuantity = inventoryQuantity;
    }

    public Long getSellableQuantity() {
        return sellableQuantity;
    }

    public void setSellableQuantity(@NotNull Long sellableQuantity) {
        this.sellableQuantity = sellableQuantity;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }

    public Double getWholeSalePrice() {
        return wholeSalePrice;
    }

    public void setWholeSalePrice(Double wholeSalePrice) {
        this.wholeSalePrice = wholeSalePrice;
    }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public void setRetailPrice(Double retailPrice) {
        this.retailPrice = retailPrice;
    }

    public String getRecordStatus() {
        return recordStatus.getStatus();
    }

    public void setRecordStatus(RecordStatus recordStatus) {
        this.recordStatus = recordStatus;
    }
}