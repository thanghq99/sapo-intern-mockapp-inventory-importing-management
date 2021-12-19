package com.sapo.storemanagement.entities;

public enum OrderStatus {
    PROCESSING("Đang giao dịch"), CANCELLED("Đã hủy");

    private String status;

    OrderStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
