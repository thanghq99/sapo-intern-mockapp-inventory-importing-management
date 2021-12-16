package com.sapo.storemanagement.entities;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "code", nullable = false, length = 16)
    private String code;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "address", nullable = false, length = 128)
    private String address;

    @Column(name = "phone", length = 11)
    private String phone;

    @Column(name = "email", length = 128)
    private String email;

    @Column(name = "website", length = 128)
    private String website;

    @Column(name = "description")
    private String description;

    @Column(name = "fax", length = 32)
    private String fax;

    @Column(name = "debt", precision = 12, scale = 2)
    private BigDecimal debt;

    private SupplierStatus activityStatus;

    private RecordStatus recordStatus;

    public Supplier() {
    }

    public Supplier(Integer id, String code, String name, String address) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.address = address;
    }

    public Supplier(Integer id, String code, String name,
                    String address, String phone, String email,
                    String website, String description, String fax,
                    BigDecimal debt, SupplierStatus activityStatus, RecordStatus recordStatus) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.description = description;
        this.fax = fax;
        this.debt = debt;
        this.activityStatus = activityStatus;
        this.recordStatus = recordStatus;
    }

    public Integer getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public BigDecimal getDebt() {
        return debt;
    }

    public void setDebt(BigDecimal debt) {
        this.debt = debt;
    }

    public SupplierStatus getActivityStatus() {
        return activityStatus;
    }

    public void setActivityStatus(SupplierStatus activityStatus) {
        this.activityStatus = activityStatus;
    }

    public RecordStatus getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(RecordStatus recordStatus) {
        this.recordStatus = recordStatus;
    }
}