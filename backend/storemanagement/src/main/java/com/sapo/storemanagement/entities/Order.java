package com.sapo.storemanagement.entities;

import com.sapo.storemanagement.exception.BadNumberException;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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

    @Column(name = "code", nullable = false, unique = true, length = 8)
    @NotBlank(message = "Order code cannot be blank")
    @Size(max = 8, message = "Order code length cannot exceed {max}")
    private String code;

    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @Column(name = "total_amount", nullable = false)
    @NotNull(message = "Total amount cannot be null")
    @Min(value = 0, message = "Total amount cannot be less than {value}")
    private Double totalAmount = 0.0;

    @Column(name = "paid_amount")
    @NotNull(message = "Paid amount cannot be null")
    @Min(value = 0, message = "Total amount cannot be less than {value}")
    private Double paidAmount = 0.0;

    @Column(name = "description", columnDefinition = "varchar(255) DEFAULT ''")
    @NotNull(message = "Description cannot be null")
    @Size(max = 255, message = "Order description length cannot exceed {max}")
    private String description;

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

    public Order(String code, Supplier supplier, String description,
                 LocalDate expectedTime, User createdBy) {
        this.code = code;
        this.supplier = supplier;
        this.description = description;
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

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(double paidAmount) {
        this.paidAmount = paidAmount;
        if(this.paidAmount < this.totalAmount) {
            this.setTransactionStatus(TransactionStatus.PARTIAL_PAID);
        }
        else {
            this.setTransactionStatus(TransactionStatus.PAID);
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
