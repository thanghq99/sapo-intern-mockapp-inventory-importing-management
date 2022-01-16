package com.sapo.storemanagement.dto;

public class ReportEachMonthDto {
    private long totalOrders;
    private long totalSuppliedQuantity;
    private double totalAmount;

    public ReportEachMonthDto(long totalOrders, long totalSuppliedQuantity, double totalAmount) {
        this.totalOrders = totalOrders;
        this.totalSuppliedQuantity = totalSuppliedQuantity;
        this.totalAmount = totalAmount;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public long getTotalSuppliedQuantity() {
        return totalSuppliedQuantity;
    }

    public double getTotalAmount() {
        return totalAmount;
    }
}
