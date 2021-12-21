package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.PaymentInvoice;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.ForeignKeyConstraintException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.PaymentInvoiceRepository;
import com.sapo.storemanagement.repository.UserRepository;
import com.sapo.storemanagement.service.PaymentInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentInvoiceServiceImpl implements PaymentInvoiceService {
    private final PaymentInvoiceRepository paymentInvoiceRepository;
    private final OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public PaymentInvoiceServiceImpl(PaymentInvoiceRepository paymentInvoiceRepository, OrderRepository orderRepository) {
        this.paymentInvoiceRepository = paymentInvoiceRepository;
        this.orderRepository = orderRepository;
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
    public PaymentInvoice savePaymentInvoice(PaymentInvoice paymentInvoice) {
        // check foreign key constraint
        if(!orderRepository.existsById(paymentInvoice.getOrder().getId())) {
            throw new ForeignKeyConstraintException("Referenced product does not exist");
        }
        if(!userRepository.existsById(paymentInvoice.getCreatedBy().getId())) {
            throw new ForeignKeyConstraintException("Invoice creator does not exist");
        }

        return paymentInvoiceRepository.save(paymentInvoice);
    }
}
