package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByCode(String code);
}