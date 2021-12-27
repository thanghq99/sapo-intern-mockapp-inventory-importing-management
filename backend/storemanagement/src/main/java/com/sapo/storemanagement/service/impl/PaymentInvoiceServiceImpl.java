package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.ForeignKeyConstraintException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.PaymentInvoiceRepository;
import com.sapo.storemanagement.repository.SupplierRepository;
import com.sapo.storemanagement.repository.UserRepository;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.PaymentInvoiceService;
import com.sapo.storemanagement.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PaymentInvoiceServiceImpl implements PaymentInvoiceService {
    private final PaymentInvoiceRepository paymentInvoiceRepository;

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private OrderService orderService;

    @Autowired
    public PaymentInvoiceServiceImpl(PaymentInvoiceRepository paymentInvoiceRepository, OrderRepository orderRepository) {
        this.paymentInvoiceRepository = paymentInvoiceRepository;
    }

    @Override
    public List<PaymentInvoice> listAllPaymentInvoices() {
        return this.paymentInvoiceRepository.findAll();
    }

    @Override
    public PaymentInvoice getPaymentInvoiceById(long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        return paymentInvoiceRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Payment Invoice not found"));
    }

    @Override
    @Transactional
    public PaymentInvoice savePaymentInvoice(PaymentInvoice paymentInvoice) {
        Order order = orderService.increasePaidAmount(paymentInvoice.getOrder().getId(), paymentInvoice.getAmount());
        Supplier supplier = supplierService.decreaseDebt(order.getSupplier().getId(), paymentInvoice.getAmount());

        return paymentInvoiceRepository.save(paymentInvoice);
    }
}
