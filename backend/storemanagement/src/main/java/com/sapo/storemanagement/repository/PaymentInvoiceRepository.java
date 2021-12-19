package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.PaymentInvoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentInvoiceRepository extends JpaRepository<PaymentInvoice, Long> {
}