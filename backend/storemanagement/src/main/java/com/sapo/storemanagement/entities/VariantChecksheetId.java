package com.sapo.storemanagement.entities;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VariantChecksheetId implements Serializable {
    private static final long serialVersionUID = -1162133790639918804L;

    @Column(name = "product_id", nullable = false)
    private Integer productId;

    @Column(name = "checksheet_id", nullable = false)
    private Integer checksheetId;

    public Integer getChecksheetId() {
        return checksheetId;
    }

    public void setChecksheetId(Integer checksheetId) {
        this.checksheetId = checksheetId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, checksheetId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        VariantChecksheetId entity = (VariantChecksheetId) o;
        return Objects.equals(this.productId, entity.productId) &&
            Objects.equals(this.checksheetId, entity.checksheetId);
    }
}