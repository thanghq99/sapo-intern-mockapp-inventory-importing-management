package com.sapo.storemanagement.entities;

import javax.persistence.*;

@Entity
@Table(name = "variants_check_sheets", indexes = {
    @Index(name = "checksheet_id", columnList = "checksheet_id")
})
public class VariantsCheckSheet {
    @EmbeddedId
    private VariantsCheckSheetId id;

    @Column(name = "inventory_quantity", nullable = false)
    private Integer inventoryQuantity;

    @Column(name = "real_quantity", nullable = false)
    private Integer realQuantity;

    @Column(name = "note")
    private String note = "";

    public VariantsCheckSheet() {
    }
}