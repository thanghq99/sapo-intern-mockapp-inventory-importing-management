package com.sapo.storemanagement.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
//    @JsonIgnore
    private Product product;

    @Column(name = "code", nullable = false, unique = true, length = 16)
    @NotBlank(message = "Variant code cannot be blank")
    @Size(max = 16, message = "Variant code length cannot exceed {max}")
    private String code;

    @Column(name = "inventory_quantity", nullable = false)
    @Min(value = 0, message = "Invalid inventory quantity, must be positive")
    private Long inventoryQuantity;

    @Column(name = "sellable_quantity", nullable = false)
    @Min(value = 0, message = "Invalid sellable quantity, must be positive")
    private Long sellableQuantity;

    @Column(name = "size", length = 8)
    @NotNull(message = "Variant size cannot be null")
    @Size(max = 8, message = "Variant size length cannot exceed {max}")
    private String size = "";

    @Column(name = "color", length = 16)
    @NotNull(message = "Variant color cannot be null")
    @Size(max = 16, message = "Variant color length cannot exceed {max}")
    private String color = "";

    @Column(name = "material", length = 32)
    @NotNull(message = "Variant material cannot be null")
    @Size(max = 32, message = "Variant material length cannot exceed {max}")
    private String material = "";

    @Column(name = "unit", length = 16)
    @NotNull(message = "Variant unit cannot be null")
    @Size(max = 16, message = "Variant unit length cannot exceed {max}")
    private String unit = "";

    @Column(name = "original_price", nullable = false)
    @NotNull(message = "Please input original price")
    @Min(value = 0, message = "Invalid original price, must be positive")
    private Double originalPrice;

    @Column(name = "whole_sale_price", nullable = false)
    @NotNull(message = "Please input wholesale price")
    @Min(value = 0, message = "Invalid wholesale price, must be positive")
    private Double wholeSalePrice;

    @Column(name = "retail_price", nullable = false)
    @NotNull(message = "Please input retail price")
    @Min(value = 0, message = "Invalid retail price, must be positive")
    private Double retailPrice;

    @Column(name = "record_status", length = 32)
    private RecordStatus recordStatus = RecordStatus.ACTIVE;

    @Column(name = "sell_status", columnDefinition = "varchar(32) DEFAULT 'Có thể bán'")
    private SellableStatus sellableStatus = SellableStatus.SELLABLE;

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

    public void setCode(String code) {
        this.code = code;
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

    public String getSellableStatus() {
        return sellableStatus.getStatus();
    }

    public void setSellableStatus(SellableStatus sellableStatus) {
        this.sellableStatus = sellableStatus;
    }
}