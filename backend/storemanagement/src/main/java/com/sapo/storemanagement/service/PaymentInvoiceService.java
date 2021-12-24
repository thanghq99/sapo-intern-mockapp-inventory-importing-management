package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.PaymentInvoice;

import java.util.List;

public interface PaymentInvoiceService {
    PaymentInvoice getPaymentInvoiceById(long id);

    List<PaymentInvoice> listAllPaymentInvoices();

    PaymentInvoice savePaymentInvoice(PaymentInvoice paymentInvoice);
}
