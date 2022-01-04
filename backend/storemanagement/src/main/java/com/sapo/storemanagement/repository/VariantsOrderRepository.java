package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.VariantsOrder;
import com.sapo.storemanagement.entities.VariantsOrderId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VariantsOrderRepository extends JpaRepository<VariantsOrder, VariantsOrderId> {
    @Query(value = "select * from variants_orders where variants_orders.order_id = :orderId",
    nativeQuery = true)
    List<VariantsOrder> findVariantByOrderId(@Param("orderId") long orderId);
    @Query(value = "delete from variants_orders where variants_orders.variant_id = :variantId and variants_orders.order_id = :orderId ", nativeQuery = true)
    VariantsOrder deleteVariantOderInOrder(@Param("orderId") long orderId, @Param("variantId") long variantId);
}