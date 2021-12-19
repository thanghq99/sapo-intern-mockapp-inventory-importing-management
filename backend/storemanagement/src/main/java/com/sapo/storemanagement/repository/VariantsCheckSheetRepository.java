package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.VariantsCheckSheet;
import com.sapo.storemanagement.entities.VariantsCheckSheetId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VariantsCheckSheetRepository extends JpaRepository<VariantsCheckSheet, VariantsCheckSheetId> {
}