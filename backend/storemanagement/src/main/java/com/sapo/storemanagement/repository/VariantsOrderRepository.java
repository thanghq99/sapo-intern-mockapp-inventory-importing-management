package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.VariantsOrder;
import com.sapo.storemanagement.entities.VariantsOrderId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VariantsOrderRepository extends JpaRepository<VariantsOrder, VariantsOrderId> {
}