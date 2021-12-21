package com.sapo.storemanagement.entities;

import javax.persistence.*;

@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "code", nullable = false, unique = true, length = 16)
    private String code;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "address", nullable = false, length = 128)
    private String address;

    @Column(name = "phone", length = 11)
    private String phone = "";

    @Column(name = "email", length = 128)
    private String email = "";

    @Column(name = "website", length = 128)
    private String website = "";

    @Column(name = "description")
    private String description = "";

    @Column(name = "fax", length = 32)
    private String fax = "";

    @Column(name = "debt")
    private Double debt = 0.0;

    @Column(name = "activity_status", length = 32)
    private SupplierStatus activityStatus = SupplierStatus.COOPERATIVE;

    @Column(name = "record_status", length = 32)
    private RecordStatus recordStatus = RecordStatus.ACTIVE;

    public Supplier() {
    }

    public Supplier(String code, String name, String address) {
        this.code = code;
        this.name = name;
        this.address = address;
    }

    public Supplier(String code, String name, String address,
                    String phone, String email, String website,
                    String description, String fax, Double debt) {
        this.code = code;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.description = description;
        this.fax = fax;
        this.debt = debt;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Double getDebt() {
        return debt;
    }

    private void setDebt(Double debt) {
        this.debt = debt;
    }

    public void increaseDebt(double offset) {
        this.setDebt(this.debt + offset);
    }

    public void decreaseDebt(double offset) {
        this.setDebt(this.debt - offset);
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