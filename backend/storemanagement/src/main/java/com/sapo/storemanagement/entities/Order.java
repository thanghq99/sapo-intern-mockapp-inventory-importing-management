package com.sapo.storemanagement.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders", indexes = {
    @Index(name = "orders_code_unique", columnList = "code", unique = true)
})
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "code", nullable = false, length = 8)
    private String code;

    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "paid_amount")
    private Double paidAmount = 0.0;

    @Column(name = "expected_time", nullable = false)
    private LocalDate expectedTime;

    @Column(name = "status", length = 32)
    private OrderStatus status = OrderStatus.PROCESSING;

    @Column(name = "transaction_status", length = 32)
    private TransactionStatus transactionStatus = TransactionStatus.UNPAID;

    @Column(name = "imported_status", length = 32)
    private ImportedStatus importedStatus = ImportedStatus.AWAITING;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    public Order() {
    }

    public Order(String code, Supplier supplier, Double totalAmount,
                 LocalDate expectedTime, User createdBy) {
        this.code = code;
        this.supplier = supplier;
        this.totalAmount = totalAmount;
        this.expectedTime = expectedTime;
        this.createdBy = createdBy;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    private void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void increaseTotalAmount(double offset) {
        // check if offset was >= 0

        this.setTotalAmount(this.totalAmount + offset);
    }

    public void decreaseTotalAmount(double offset) {
        // check if offset was >= 0

        if(this.totalAmount >= offset) {
            this.setTotalAmount(this.totalAmount - offset);
        }
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    private void setPaidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public void increasePaidAmount(double offset) {
        // check if offset was >= 0

        this.setTotalAmount(this.paidAmount + offset);
    }

    public void decreasePaidAmount(double offset) {
        // check if offset was >= 0

        if(this.totalAmount >= offset) {
            this.setTotalAmount(this.paidAmount - offset);
        }
    }

    public LocalDate getExpectedTime() {
        return expectedTime;
    }

    public void setExpectedTime(LocalDate expectedTime) {
        this.expectedTime = expectedTime;
    }

    public String getStatus() {
        return status.getStatus();
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getTransactionStatus() {
        return transactionStatus.getStatus();
    }

    public void setTransactionStatus(TransactionStatus transactionStatus) {
        this.transactionStatus = transactionStatus;
    }

    public String getImportedStatus() {
        return importedStatus.getStatus();
    }

    public void setImportedStatus(ImportedStatus importedStatus) {
        this.importedStatus = importedStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    private void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }
}