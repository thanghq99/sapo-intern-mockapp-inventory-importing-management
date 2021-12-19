package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Variant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VariantRepository extends JpaRepository<Variant, Long> {
    Variant findByCode(String code);
}