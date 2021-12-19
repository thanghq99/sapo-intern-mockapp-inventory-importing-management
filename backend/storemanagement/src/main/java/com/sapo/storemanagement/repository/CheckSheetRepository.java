package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.CheckSheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckSheetRepository extends JpaRepository<CheckSheet, Long> {
    CheckSheet findByCode(String code);
}