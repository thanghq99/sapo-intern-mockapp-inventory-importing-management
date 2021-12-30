package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    boolean existsByCode(String code);
    Optional<Supplier> findByStatus(String status);
}