package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Order;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrder();
    Order getOrderById(long id);
    Order createdOrder(Order order);
    Order updateOrder(long id, Order order);

}
