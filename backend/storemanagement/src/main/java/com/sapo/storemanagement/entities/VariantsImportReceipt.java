package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "variants_import_receipts")
public class VariantsImportReceipt {
    @EmbeddedId
    private VariantsImportReceiptId id;

    @Column(name = "quantity", nullable = false)
    @NotNull(message = "Quantity cannot be null")
    @Size(min = 0, message = "Quantity cannot be less than {max}")
    private Long quantity;

    @ManyToOne
    @MapsId("importReceiptId")
    @JoinColumn(name = "import_receipt_id")
    private ImportReceipt importReceipt;

    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    public VariantsImportReceipt() {
    }

    public VariantsImportReceipt(long variantId, long importReceiptId, long quantity) {
        this.id = new VariantsImportReceiptId(variantId, importReceiptId);
        this.quantity = quantity;
    }

    public VariantsImportReceiptId getId() {
        return id;
    }

    public Variant getVariant() {
        return variant;
    }

    public ImportReceipt getImportReceipt() {
        return importReceipt;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}