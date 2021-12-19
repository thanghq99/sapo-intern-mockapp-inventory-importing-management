package com.sapo.storemanagement.entities;

import javax.persistence.*;

@Entity
@Table(name = "variants_orders", indexes = {
    @Index(name = "variant_id", columnList = "variant_id")
})
public class VariantsOrder {
    @EmbeddedId
    private VariantsOrderId id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @MapsId("variantId")
    @JoinColumn(name = "variant_id")
    private Variant variant;

    @Column(name = "supplied_quantity", nullable = false)
    private Integer suppliedQuantity;

    public VariantsOrder() {
    }

    public VariantsOrder(int orderId, int variantId, int suppliedQuantity) {
        this.id = new VariantsOrderId(orderId, variantId);
        this.suppliedQuantity = suppliedQuantity;
    }

    public VariantsOrderId getId() {
        return id;
    }

    public Order getOrder() {
        return order;
    }

    public Variant getVariant() {
        return variant;
    }

    public Integer getSuppliedQuantity() {
        return suppliedQuantity;
    }

    public void setSuppliedQuantity(Integer suppliedQuantity) {
        this.suppliedQuantity = suppliedQuantity;
    }
}