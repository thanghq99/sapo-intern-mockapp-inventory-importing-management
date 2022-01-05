package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.LineItemDto;
import com.sapo.storemanagement.dto.OrderDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.UserRepository;
import com.sapo.storemanagement.repository.VariantsOrderRepository;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.SupplierService;
import com.sapo.storemanagement.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

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
    public Order createdOrder(Long orderCreatorId, OrderDto orderDto) {
        Supplier supplier = supplierService.getSupplierById(orderDto.getSupplierId());
        User user = userService.getUserById(orderCreatorId);
        Order newOrder = orderRepository.save(new Order(

                orderDto.getOrderCode(),
                supplier,
                orderDto.getDescription(),
                orderDto.getDeliveryTime(),
                user
        ));
        orderDto.getLineItems().forEach(item -> {
            Variant variant = variantService.getVariantById(item.getVariantId());
            VariantsOrder variantsOrder = new VariantsOrder(
                    newOrder,
                    variant,
                    item.getQuantity(),
                    item.getPrice()
            );

            variantsOrderRepository.save(variantsOrder);
            newOrder.setTotalAmount(newOrder.getTotalAmount() + item.getPrice()*item.getQuantity());
            supplierService.increaseDebt(newOrder.getSupplier().getId(), newOrder.getTotalAmount());
        } );
        newOrder.setTotalAmount(newOrder.getTotalAmount() * 0.94);
        return newOrder;
    }

    // cap nhat thong tin 1 don nhap hang
    @Override
    @Transactional
    public Order updateOrder(long id, OrderDto newOrderDto) {
        Order orderUpdate = orderRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("order not found"));
        double oldTotalAmount = orderUpdate.getTotalAmount();
//        System.out.println("bandau: " + oldTotalAmount);
//        orderUpdate.setTotalAmount(100);
//        System.out.println("lan1 " + orderUpdate.getTotalAmount());
//        orderUpdate.setTotalAmount(orderUpdate.getTotalAmount() + 200);
//        System.out.println("lan 2 " + orderUpdate.getTotalAmount());
//        AtomicReference<Double> newTotalAmount = new AtomicReference<>((double) 0);
        if(orderUpdate.getStatus().equals("Đang giao dịch")) {
            List<LineItemDto> newVariantOrders = newOrderDto.getLineItems();
            List<VariantsOrder> variantsOrderUpdates = variantsOrderRepository.findVariantByOrderId(orderUpdate.getId());

        // Xoá đi sản phẩm cũ ko nằm trong danh sách mới và cập nhật các sản phầm
            variantsOrderUpdates.forEach(oldVariant -> {
                AtomicBoolean check = new AtomicBoolean(false);
                newVariantOrders.forEach(newVariant -> {
                    if(newVariant.getVariantId().equals(oldVariant.getVariant().getId())){
                        orderUpdate.setTotalAmount(orderUpdate.getTotalAmount() - (oldVariant.getPrice() * oldVariant.getSuppliedQuantity()) + (newVariant.getPrice() * newVariant.getQuantity()));
                        oldVariant.setPrice(newVariant.getPrice());
                        oldVariant.setSuppliedQuantity(newVariant.getQuantity());

                        variantsOrderRepository.save(oldVariant);
                        check.set(true);
                    }
                });
                if(!check.get()){
                    orderUpdate.setTotalAmount(orderUpdate.getTotalAmount() - (oldVariant.getPrice() * oldVariant.getSuppliedQuantity()));
                    variantsOrderRepository.deleteVariantOderInOrder(oldVariant.getOrder().getId(), oldVariant.getVariant().getId());
                }
            });

         // thêm sản phẩm mới chưa có trong danh sách cũ
            List<VariantsOrder> variantOrderUpdating = variantsOrderRepository.findVariantByOrderId(orderUpdate.getId());
            newVariantOrders.forEach(newVariant -> {
                // kiểm tra đã tồn tại hay chưa
                AtomicBoolean check = new AtomicBoolean(false);
                variantOrderUpdating.forEach(oldVariant -> {
                    if(newVariant.getVariantId().equals(oldVariant.getVariant().getId())){
                        check.set(true);
                    }
                });

                if(!check.get()){
                    orderUpdate.setTotalAmount(orderUpdate.getTotalAmount() + (newVariant.getPrice() * newVariant.getQuantity()));
                    Variant variant = variantService.getVariantById(newVariant.getVariantId());
                    VariantsOrder variantsOrderAdd = new VariantsOrder(
                            orderUpdate,
                            variant,
                            newVariant.getQuantity(),
                            newVariant.getPrice()
                    );
                    variantsOrderRepository.save(variantsOrderAdd);
                }
            });


            double newTotalAmount = orderUpdate.getTotalAmount();
            if(newTotalAmount < 0) {
                throw new BadNumberException("TotalAmount is invalid");
            }
            if(oldTotalAmount < newTotalAmount){
                supplierService.increaseDebt(orderUpdate.getSupplier().getId(), (newTotalAmount - oldTotalAmount));
            } else if(oldTotalAmount > newTotalAmount) {
                supplierService.decreaseDebt(orderUpdate.getSupplier().getId(), (oldTotalAmount - newTotalAmount));
            }

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

    @Override
    public List<VariantsOrder> findAllVariantInOrder(long id) {
        return variantsOrderRepository.findVariantByOrderId(id);
    }
}
