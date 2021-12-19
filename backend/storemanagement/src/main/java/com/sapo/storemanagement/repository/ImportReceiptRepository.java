package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.ImportReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportReceiptRepository extends JpaRepository<ImportReceipt, Long> {
    ImportReceipt findByCode(String code);
}