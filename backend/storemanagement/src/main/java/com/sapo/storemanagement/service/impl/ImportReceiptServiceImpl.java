package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ImportReceiptDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.ImportReceiptRepository;
import com.sapo.storemanagement.repository.VariantsOrderRepository;
import com.sapo.storemanagement.service.ImportReceiptService;
import com.sapo.storemanagement.service.OrderService;
import com.sapo.storemanagement.service.VariantService;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ImportReceiptServiceImpl implements ImportReceiptService {
    private final ImportReceiptRepository importReceiptRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private VariantsOrderRepository variantsOrderRepository;

    @Autowired
    private VariantService variantService;

    @Autowired
    @Qualifier("import-receipt-code-generator")
    private ItemCodeGenerator itemCodeGenerator;

    @Autowired
    public ImportReceiptServiceImpl(ImportReceiptRepository importReceiptRepository) {
        this.importReceiptRepository = importReceiptRepository;
    }

    @Override
    public List<ImportReceipt> listAllImportReceipts() {
        return importReceiptRepository.findAll();
    }

    @Override
    public ImportReceipt getImportReceiptById(long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        return importReceiptRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Import Receipt not found"));
    }

    @Override
    @Transactional
    public ImportReceipt saveImportReceipt(long creatorId, long orderId, ImportReceiptDto importReceiptDto) {
        User user = userService.getUserById(creatorId);
        Order order = orderService.getOrderById(orderId);

        if(!order.getStatus().equals(OrderStatus.PROCESSING.getStatus())) {
            throw new IllegalStateException("Order is not in awaiting status");
        }

        List<VariantsOrder> variantsOrders = variantsOrderRepository.findVariantByOrderId(orderId);
        long totalQuantity = 0;
        for (VariantsOrder variantsOrder : variantsOrders) {
            totalQuantity += variantsOrder.getSuppliedQuantity();
        }

        long importedQuantity = importReceiptDto.getTotalQuantity();
        ImportedStatus importedStatus;

        if(importedQuantity < totalQuantity) {
            importedStatus = ImportedStatus.PARTIAL_IMPORTED;
        }
        else if(importedQuantity == totalQuantity) {
            importedStatus = ImportedStatus.IMPORTED;
        }
        else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Imported quantity cannot exceed total quantity");
        }
        order.setImportedStatus(importedStatus);

        importReceiptDto.getLineItems().forEach(lineItemDto -> {
            Variant variant = variantService.getVariantById(lineItemDto.getVariantId());
            variant.setInventoryQuantity(variant.getInventoryQuantity() + lineItemDto.getQuantity());
            variant.setSellableQuantity(variant.getSellableQuantity() + lineItemDto.getQuantity());
        });

        String code = itemCodeGenerator.generate();
        ImportReceipt importReceipt = new ImportReceipt(code, order, user);
        return importReceiptRepository.save(importReceipt);
    }
}
