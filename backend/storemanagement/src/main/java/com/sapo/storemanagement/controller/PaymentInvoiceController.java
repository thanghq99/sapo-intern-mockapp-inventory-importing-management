package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.service.PaymentInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment-invoices")
public class PaymentInvoiceController {
    private final PaymentInvoiceService paymentInvoiceService;

    @Autowired
    public PaymentInvoiceController(PaymentInvoiceService paymentInvoiceService) {
        this.paymentInvoiceService = paymentInvoiceService;
    }
}
