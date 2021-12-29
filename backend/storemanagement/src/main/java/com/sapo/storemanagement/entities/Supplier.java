package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "code", nullable = false, unique = true, length = 16)
    @NotBlank(message = "Supplier code cannot be blank")
    @Size(max = 16, message = "Supplier code length cannot exceed {max}")
    private String code;

    @Column(name = "name", nullable = false, length = 64)
    @NotBlank(message = "Supplier name cannot be blank")
    @Size(max = 64, message = "Supplier code length cannot exceed {max}")
    private String name;

    @Column(name = "address", nullable = false, length = 128)
    @NotBlank(message = "Supplier address cannot be blank")
    @Size(max = 128, message = "Supplier code length cannot exceed {max}")
    private String address;

    @Column(name = "phone", length = 11)
    @NotNull(message = "Supplier phone cannot be null")
    @Size(max = 11, message = "Supplier phone length cannot exceed {max}")
    private String phone = "";

    @Column(name = "email", length = 128)
    @NotNull(message = "Supplier phone cannot be null")
    @Size(max = 128, message = "Supplier email length cannot exceed {max}")
    private String email = "";

    @Column(name = "website", length = 128)
    @NotNull(message = "Supplier website cannot be null")
    @Size(max = 128, message = "Supplier website length cannot exceed {max}")
    private String website = "";

    @Column(name = "description")
    @NotNull(message = "Supplier description cannot be null")
    @Size(max = 255, message = "Supplier description length cannot exceed {max}")
    private String description = "";

    @Column(name = "fax", length = 32)
    @NotNull(message = "Supplier fax cannot be null")
    @Size(max = 32, message = "Supplier fax length cannot exceed {max}")
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

    public void setDebt(Double debt) {
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