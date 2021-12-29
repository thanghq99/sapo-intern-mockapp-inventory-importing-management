package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.VariantsOrder;
import com.sapo.storemanagement.entities.VariantsOrderId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VariantsOrderRepository extends JpaRepository<VariantsOrder, VariantsOrderId> {
    List<VariantsOrder> findByOrderId(long orderId);
}