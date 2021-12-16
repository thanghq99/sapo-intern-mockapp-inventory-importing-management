package com.sapo.storemanagement.entities;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VariantSupplyorderId implements Serializable {
    private static final long serialVersionUID = -3373875422106185652L;
    @Column(name = "supply_order_id", nullable = false)
    private Integer supplyOrderId;
    @Column(name = "product_id", nullable = false)
    private Integer productId;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getSupplyOrderId() {
        return supplyOrderId;
    }

    public void setSupplyOrderId(Integer supplyOrderId) {
        this.supplyOrderId = supplyOrderId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(supplyOrderId, productId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        VariantSupplyorderId entity = (VariantSupplyorderId) o;
        return Objects.equals(this.supplyOrderId, entity.supplyOrderId) &&
            Objects.equals(this.productId, entity.productId);
    }
}