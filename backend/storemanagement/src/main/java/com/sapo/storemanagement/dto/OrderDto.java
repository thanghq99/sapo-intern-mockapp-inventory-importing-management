package com.sapo.storemanagement.dto;

import com.sapo.storemanagement.entities.User;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class OrderDto {
    @NotNull(message = "Hãy điền nhà cung cấp cho đơn hàng")
    @Min(value = 0, message = "Id của nhà cung cấp không được nhở hơn 0")
    private Long supplierId;

    private List<LineItemDto> lineItems;

    @NotNull(message = "Mã đơn nhập hàng không được null")
    @Size(max = 8, message = "Độ dài của mã đơn nhập hàng không được vượt quá {max}")
    private String orderCode;

    @NotNull(message = "Ghi chú của đơn nhập hàng không được null")
    @Size(max = 255, message = "Độ dài của ghi chú không được vượt quá {max}")
    private String description;

    private LocalDate deliveryTime;

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
