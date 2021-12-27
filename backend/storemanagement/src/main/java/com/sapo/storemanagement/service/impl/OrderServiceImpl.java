package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.Order;
import com.sapo.storemanagement.entities.OrderStatus;
import com.sapo.storemanagement.entities.TransactionStatus;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    private SupplierService supplierService;

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
    @Transactional
    public Order createdOrder(Order order) {
        orderRepository.save(order);
        supplierService.increaseDebt(order.getSupplier().getId(), order.getTotalAmount());
        return order;
    }

    // cap nhat thong tin 1 don nhap hang
    @Override
    @Transactional
    public Order updateOrder(long id, Order newOrder) {
        Order orderUpdate = orderRepository.findById(id).get();
        if(orderUpdate.getStatus() == "Đang giao dịch") {
            orderUpdate.setTotalAmount(newOrder.getTotalAmount());
//            orderUpdate.setPaidAmount(newOrder.getPaidAmount());
            orderUpdate.setExpectedTime(newOrder.getExpectedTime());
//            orderUpdate.setImportedStatus(newOrder.getImportedStatus());
        }
        orderRepository.save(orderUpdate);
        return orderUpdate;
    }

    @Override
    @Transactional
    public Order increasePaidAmount(long orderId, double offset) {
        if(offset < 0) {
            throw new BadNumberException("You can't pay negative money");
        }

        Order order = this.getOrderById(orderId);
        if(order.getStatus().equals(OrderStatus.COMPLETE.getStatus())) {
            throw new IllegalStateException("You can't pay an order with status: complete");
        }
        if(order.getTransactionStatus().equals(TransactionStatus.PAID.getStatus())) {
            throw new IllegalStateException("This order is already fully paid");
        }

        order.setPaidAmount(order.getPaidAmount() + offset);
        return order;
    }
}
