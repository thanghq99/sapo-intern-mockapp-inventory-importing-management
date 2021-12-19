package com.sapo.storemanagement.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "import_receipts")
public class ImportReceipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "code", nullable = false, length = 8)
    private String code;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    public ImportReceipt() {
    }

    public ImportReceipt(String code, Order order, User createdBy) {
        this.code = code;
        this.order = order;
        this.createdBy = createdBy;
    }

    public String getCode() {
        return code;
    }

    public Order getOrder() {
        return order;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }
}