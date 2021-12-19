package com.sapo.storemanagement.entities;

import javax.persistence.*;

@Entity
@Table(name = "variants_orders", indexes = {
    @Index(name = "variant_id", columnList = "variant_id")
})
public class VariantsOrder {
    @EmbeddedId
    private VariantsOrderId id;

    @Column(name = "supplied_quantity", nullable = false)
    private Integer suppliedQuantity;

    public VariantsOrderId getId() {
        return id;
    }

    public Integer getSuppliedQuantity() {
        return suppliedQuantity;
    }

    public void setSuppliedQuantity(Integer suppliedQuantity) {
        this.suppliedQuantity = suppliedQuantity;
    }
}