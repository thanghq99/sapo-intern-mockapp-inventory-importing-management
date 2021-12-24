package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.Order;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // lay danh sach tat ca don nhap hang
    @Override
    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }

    // lay thong tin don nhap hang theo id
    @Override
    public Order getOrderById(long id) {
        Order order = orderRepository.findById(id).get();
        return order;
    }

    // luu thong tin 1 don nhap hang
    @Override
    public Order createdOrder(Order order) {
        orderRepository.save(order);
        return order;
    }

    // cap nhat thong tin 1 don nhap hang
    @Override
    public Order updateOrder(long id, Order newOrder) {
        Order orderUpdate = orderRepository.findById(id).get();
        if(orderUpdate.getStatus() == "Đang giao dịch")
            orderUpdate.setTotalAmount(newOrder.getTotalAmount());
//            orderUpdate.setPaidAmount(newOrder.getPaidAmount());
            orderUpdate.setExpectedTime(newOrder.getExpectedTime());
//            orderUpdate.setImportedStatus(newOrder.getImportedStatus());
        orderRepository.save(orderUpdate);
        return orderUpdate;
    }

}
