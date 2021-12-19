package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}