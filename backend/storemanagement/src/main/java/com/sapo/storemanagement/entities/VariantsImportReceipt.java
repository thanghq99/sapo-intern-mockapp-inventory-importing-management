package com.sapo.storemanagement.entities;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "variants_import_receipts")
public class VariantsImportReceipt {
    @EmbeddedId
    private VariantsImportReceiptId id;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

    public VariantsImportReceiptId getId() {
        return id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}