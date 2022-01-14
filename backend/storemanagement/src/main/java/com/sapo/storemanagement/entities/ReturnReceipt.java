package com.sapo.storemanagement.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "return_receipts", indexes = {
    @Index(name = "fk_return_receipts_2_idx", columnList = "created_by"),
    @Index(name = "fk_return_receipts_1_idx", columnList = "order_id"),
    @Index(name = "code_UNIQUE", columnList = "code", unique = true)
})
public class ReturnReceipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "code", length = 8)
    private String code;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "note")
    private String note = "";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    public ReturnReceipt() {
    }

    public ReturnReceipt(String code, Order order, User createdBy, String note) {
        this.code = code;
        this.order = order;
        this.createdBy = createdBy;
        this.note = note;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}