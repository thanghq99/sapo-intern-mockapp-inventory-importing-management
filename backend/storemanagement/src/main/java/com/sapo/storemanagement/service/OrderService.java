package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Order;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrder();

    Order getOrderById(long id);

    @Transactional
    Order createdOrder(Order order);

    @Transactional
    Order updateOrder(long id, Order order);

    @Transactional
    Order increasePaidAmount(long orderId, double offset);
}
