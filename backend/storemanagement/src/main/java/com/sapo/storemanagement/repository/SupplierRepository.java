package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Supplier findByCode(String code);
}