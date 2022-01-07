package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.dto.ImportReceiptDto;
import com.sapo.storemanagement.dto.OrderDto;
import com.sapo.storemanagement.dto.PayOrderDto;
import com.sapo.storemanagement.entities.ImportReceipt;
import com.sapo.storemanagement.entities.Order;
import com.sapo.storemanagement.entities.PaymentInvoice;
import com.sapo.storemanagement.entities.VariantsOrder;
import com.sapo.storemanagement.service.ImportReceiptService;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.PaymentInvoiceService;
import com.sapo.storemanagement.utils.RequestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
    private final OrderService orderService;

    @Autowired
    private PaymentInvoiceService paymentInvoiceService;

    @Autowired
    private ImportReceiptService importReceiptService;

    @Autowired
    private RequestUtils requestUtils;

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
    public Order createOrder(HttpServletRequest servletRequest, @RequestBody @Valid OrderDto orderDto){
        Long orderCreatorId = requestUtils.getUserIdFromRequest(servletRequest);
        return orderService.createdOrder(orderCreatorId, orderDto);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable long id, @RequestBody OrderDto orderDto){
        return orderService.updateOrder(id, orderDto);
    }

    @GetMapping("/{id}/variants")
    public List<VariantsOrder> findAllVariantInOrder(@PathVariable long id) {
        return orderService.findAllVariantInOrder(id);
    }

    @PostMapping("/{orderId}/payment")
    public PaymentInvoice payOrder(HttpServletRequest servletRequest, @PathVariable long orderId, @RequestBody PayOrderDto payOrderDto) {
        Long invoiceCreatorId = requestUtils.getUserIdFromRequest(servletRequest);
        return paymentInvoiceService.savePaymentInvoice(invoiceCreatorId, orderId, payOrderDto);
    }

    @PostMapping("/{orderId}/import")
    public ImportReceipt importOrder(HttpServletRequest servletRequest, @PathVariable long orderId, @RequestBody ImportReceiptDto importReceiptDto) {
        Long creatorId = requestUtils.getUserIdFromRequest(servletRequest);
        return importReceiptService.saveImportReceipt(creatorId, orderId, importReceiptDto);
    }
}
// @Valid put