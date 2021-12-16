package com.sapo.storemanagement.entities;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "variant_supplyorder")
public class VariantSupplyorder {
    @EmbeddedId
    private VariantSupplyorderId id;

    @Column(name = "supplied_quantity", nullable = false)
    private Integer suppliedQuantity;

    public Integer getSuppliedQuantity() {
        return suppliedQuantity;
    }

    public void setSuppliedQuantity(Integer suppliedQuantity) {
        this.suppliedQuantity = suppliedQuantity;
    }

    public VariantSupplyorderId getId() {
        return id;
    }

    public void setId(VariantSupplyorderId id) {
        this.id = id;
    }
}