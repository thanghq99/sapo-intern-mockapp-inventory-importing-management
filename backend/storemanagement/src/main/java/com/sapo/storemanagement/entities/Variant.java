package com.sapo.storemanagement.entities;

import javax.persistence.*;

@Entity
@Table(name = "variants")
public class Variant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "products_id", nullable = false)
    private Product product;

    @Column(name = "code", nullable = false, length = 16)
    private String code;

    @Column(name = "inventory_quantity", nullable = false)
    private Integer inventoryQuantity;

    @Column(name = "sellable_quantity", nullable = false)
    private Integer sellableQuantity;

    @Column(name = "size", length = 8)
    private String size;

    @Column(name = "color", length = 16)
    private String color;

    @Column(name = "material", length = 32)
    private String material;

    @Column(name = "unit", nullable = false, length = 16)
    private String unit;

    @Column(name = "original_price", nullable = false)
    private Double originalPrice;

    @Column(name = "whole_sale_price", nullable = false)
    private Double wholeSalePrice;

    @Column(name = "retail_price", nullable = false)
    private Double retailPrice;

    private RecordStatus recordStatus;
}