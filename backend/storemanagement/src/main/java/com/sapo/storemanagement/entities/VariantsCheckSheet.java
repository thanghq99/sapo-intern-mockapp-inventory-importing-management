package com.sapo.storemanagement.entities;

import javax.persistence.*;

@Entity
@Table(name = "variants_check_sheets", indexes = {
    @Index(name = "checksheet_id", columnList = "checksheet_id")
})
public class VariantsCheckSheet {
    @EmbeddedId
    private VariantsCheckSheetId id;

    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    @ManyToOne
    @MapsId("checksheetId")
    @JoinColumn(name = "check_sheet_id")
    private CheckSheet checkSheet;

    @Column(name = "inventory_quantity", nullable = false)
    private Integer inventoryQuantity;

    @Column(name = "real_quantity", nullable = false)
    private Integer realQuantity;

    @Column(name = "note")
    private String note = "";

    public VariantsCheckSheet() {
    }

    public VariantsCheckSheet(int variantId, int checksheetId, int inventoryQuantity, int realQuantity) {
        this.id = new VariantsCheckSheetId(variantId, checksheetId);
        this.inventoryQuantity = inventoryQuantity;
        this.realQuantity = realQuantity;
    }

    public VariantsCheckSheet(int variantId, int checksheetId,
                              int inventoryQuantity, int realQuantity,
                              String note) {
        this.id = new VariantsCheckSheetId(variantId, checksheetId);
        this.inventoryQuantity = inventoryQuantity;
        this.realQuantity = realQuantity;
        this.note = note;
    }

    public VariantsCheckSheetId getId() {
        return id;
    }

    public Variant getVariant() {
        return variant;
    }

    public CheckSheet getCheckSheet() {
        return checkSheet;
    }

    public Integer getInventoryQuantity() {
        return inventoryQuantity;
    }

    public Integer getRealQuantity() {
        return realQuantity;
    }

    public void setRealQuantity(Integer realQuantity) {
        this.realQuantity = realQuantity;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}