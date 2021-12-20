package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.VariantsImportReceipt;
import com.sapo.storemanagement.entities.VariantsImportReceiptId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VariantsImportReceiptRepository extends JpaRepository<VariantsImportReceipt, VariantsImportReceiptId> {
}