package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.dto.OrderDto;
import com.sapo.storemanagement.dto.PayOrderDto;
import com.sapo.storemanagement.entities.Order;
import com.sapo.storemanagement.entities.VariantsOrder;
import com.sapo.storemanagement.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}")
    public Order findOrderById(@PathVariable long id){
        return orderService.getOrderById(id);
    }

    @GetMapping
    public List<Order> findAllOrder(){
        return orderService.getAllOrder();
    }
    @PostMapping
    public Order createOrder(@RequestBody @Valid OrderDto orderDto){
        return orderService.createdOrder(orderDto);
    }
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable long id, @RequestBody OrderDto orderDto){
        return orderService.updateOrder(id, orderDto);
    }

    @GetMapping("/{id}/variants")
    public List<VariantsOrder> findAllVariantInOrder(@PathVariable long id) {
        return orderService.findAllVariantInOrder(id);
    }

    @PostMapping("/{id}/payment")
    public void payOrder(@PathVariable long orderId, @RequestBody PayOrderDto amount) {
        
    }
}
// @Valid put