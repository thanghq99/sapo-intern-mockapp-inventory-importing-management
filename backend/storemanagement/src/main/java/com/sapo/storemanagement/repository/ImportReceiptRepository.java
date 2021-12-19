package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.ImportReceipt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportReceiptRepository extends JpaRepository<ImportReceipt, Long> {
    ImportReceipt findByCode(String code);
}