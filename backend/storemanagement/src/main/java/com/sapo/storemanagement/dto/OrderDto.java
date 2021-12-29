package com.sapo.storemanagement.dto;

import java.time.LocalDate;
import java.util.List;

public class OrderDto {
    private Long supplierId;
    private List<LineItemDto> lineItems;
    private String orderCode;
    private String description;
    private LocalDate deliveryTime;

    public Long getSupplierId() {
        return supplierId;
    }

    public List<LineItemDto> getLineItems() {
        return lineItems;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDeliveryTime() {
        return deliveryTime;
    }
}
