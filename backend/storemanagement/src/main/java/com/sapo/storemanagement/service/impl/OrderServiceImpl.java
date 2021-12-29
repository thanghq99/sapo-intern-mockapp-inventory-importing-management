package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.LineItemDto;
import com.sapo.storemanagement.dto.OrderDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.UserRepository;
import com.sapo.storemanagement.repository.VariantRepository;
import com.sapo.storemanagement.repository.VariantsOrderRepository;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.SupplierService;
import com.sapo.storemanagement.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    private SupplierService supplierService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VariantService variantService;
    @Autowired
    private VariantsOrderRepository variantsOrderRepository;

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
    public Order createdOrder(OrderDto orderDto) {
        Supplier supplier = supplierService.getSupplierById(orderDto.getSupplierId());
        User user = userRepository.getById(orderDto.getCreatedBy());
        Order newOrder = orderRepository.save(new Order(

                orderDto.getOrderCode(),
                supplier,
                orderDto.getDescription(),
                orderDto.getDeliveryTime(),
                user
        ));
        orderDto.getLineItems().forEach(item -> {
            VariantsOrder variantsOrder = new VariantsOrder(
                    newOrder.getId(),
                    item.getVariantId(),
                    item.getQuantity(),
                    item.getPrice()
            );
            variantsOrderRepository.save(variantsOrder);
            newOrder.setTotalAmount(newOrder.getTotalAmount() + item.getPrice()*item.getQuantity());
            supplierService.increaseDebt(newOrder.getSupplier().getId(), newOrder.getTotalAmount());
        } );

        return newOrder;
    }

    // cap nhat thong tin 1 don nhap hang
    @Override
    @Transactional
    public Order updateOrder(long id, OrderDto newOrderDto) {
        Order orderUpdate = orderRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("order not found"));

        if(orderUpdate.getStatus() == "Đang giao dịch") {
            List<LineItemDto> newVariantOrders = newOrderDto.getLineItems();
            List<VariantsOrder> variantsOrderUpdates = variantsOrderRepository.findByOrderId(orderUpdate.getId());
            variantsOrderUpdates.forEach(oldVariant -> {
                newVariantOrders.forEach(newVariant -> {
                    if(newVariant.getVariantId() == oldVariant.getVariant().getId()){
                        oldVariant.setPrice(newVariant.getPrice());
                        oldVariant.setSuppliedQuantity(newVariant.getQuantity());

                    } else {
                        orderUpdate.setTotalAmount(orderUpdate.getTotalAmount() - oldVariant.getPrice()*oldVariant.getSuppliedQuantity());
//                    variantsOrderRepository.delete(oldVariant.getId());
                    }
                });
            });

            orderUpdate.setExpectedTime(newOrderDto.getDeliveryTime());
            orderUpdate.setDescription(newOrderDto.getDescription());
            orderUpdate.setUpdatedAt(LocalDateTime.now());
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
