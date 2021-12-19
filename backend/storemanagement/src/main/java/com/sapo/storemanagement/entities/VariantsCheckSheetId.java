package com.sapo.storemanagement.entities;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class VariantsCheckSheetId implements Serializable {
    private static final long serialVersionUID = 4456938104971511060L;

    @Column(name = "variant_id", nullable = false)
    private Integer variantId;

    @Column(name = "checksheet_id", nullable = false)
    private Integer checksheetId;

    public VariantsCheckSheetId() {
    }

    public VariantsCheckSheetId(Integer variantId, Integer checksheetId) {
        this.variantId = variantId;
        this.checksheetId = checksheetId;
    }

    public Integer getChecksheetId() {
        return checksheetId;
    }

    public void setChecksheetId(Integer checksheetId) {
        this.checksheetId = checksheetId;
    }

    public Integer getVariantId() {
        return variantId;
    }

    public void setVariantId(Integer variantId) {
        this.variantId = variantId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(variantId, checksheetId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        VariantsCheckSheetId entity = (VariantsCheckSheetId) o;
        return Objects.equals(this.variantId, entity.variantId) &&
            Objects.equals(this.checksheetId, entity.checksheetId);
    }
}