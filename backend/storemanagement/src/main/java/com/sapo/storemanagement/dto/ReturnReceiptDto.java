package com.sapo.storemanagement.dto;

import java.util.List;

public class ReturnReceiptDto {
    private List<LineItemDto> lineItems;
    private String note;

    public List<LineItemDto> getLineItems() {
        return lineItems;
    }

    public String getNote() {
        return note;
    }
}
