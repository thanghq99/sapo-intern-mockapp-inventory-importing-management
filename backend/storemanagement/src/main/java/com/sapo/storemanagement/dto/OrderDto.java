package com.sapo.storemanagement.dto;

import com.sapo.storemanagement.entities.User;

import java.time.LocalDate;
import java.util.List;

public class OrderDto {
    private Long supplierId;
    private List<LineItemDto> lineItems;
    private String orderCode;
    private String description;
    private LocalDate deliveryTime;
//    private Long createdBy;

    public OrderDto(Long supplierId, List<LineItemDto> lineItems, String orderCode, String description, LocalDate deliveryTime) {
        this.supplierId = supplierId;
        this.lineItems = lineItems;
        this.orderCode = orderCode;
        this.description = description;
        this.deliveryTime = deliveryTime;
//        this.createdBy = createdBy;
    }

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

//    public Long getCreatedBy() {
//        return createdBy;
//    }
}
