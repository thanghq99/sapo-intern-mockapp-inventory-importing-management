package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.VariantsOrder;
import com.sapo.storemanagement.entities.VariantsOrderId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VariantsOrderRepository extends JpaRepository<VariantsOrder, VariantsOrderId> {
//    @Modifying
    @Query(value = "select * from variants_orders where variants_orders.order_id = :orderId",
    nativeQuery = true)
    List<VariantsOrder> findVariantByOrderId(@Param("orderId") long orderId);

    @Modifying
    @Query(value = "delete from variants_orders where variants_orders.variant_id = :variantId and variants_orders.order_id = :orderId ", nativeQuery = true)
    Integer deleteVariantOderInOrder(@Param("orderId") long orderId, @Param("variantId") long variantId);

    @Query(
        value = "SELECT COUNT(1) FROM variants_orders WHERE order_id = :orderId AND variant_id = :variantId",
        nativeQuery = true
    )
    int isVariantSuppliedInOrder(@Param("variantId") long variantId, @Param("orderId") long orderId);

    @Query(
        value = "SELECT supplied_quantity FROM variants_orders WHERE variant_id = :variantId AND order_id = :orderId",
        nativeQuery = true
    )
    long totalSuppliedQuantityOfVariantInOrder(@Param("variantId") long variantId, @Param("orderId") long orderId);
}