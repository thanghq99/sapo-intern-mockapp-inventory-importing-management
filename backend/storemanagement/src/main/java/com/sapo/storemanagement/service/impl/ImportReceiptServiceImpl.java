package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ImportReceiptDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.ImportReceiptRepository;
import com.sapo.storemanagement.repository.VariantsImportReceiptRepository;
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
import java.util.concurrent.atomic.AtomicReference;

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
    private VariantsImportReceiptRepository variantsImportReceiptRepository;

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

        String code = itemCodeGenerator.generate();
        ImportReceipt importReceipt = importReceiptRepository.save(new ImportReceipt(code, order, user));
        AtomicReference<ImportedStatus> importedStatus = new AtomicReference<>(ImportedStatus.IMPORTED);

        importReceiptDto.getLineItems().forEach(lineItem -> {
            /*
            Step 1: Check if imported variant is supplied in the order
                    If not, throw error
             */
            if(variantsOrderRepository.isVariantSuppliedInOrder(lineItem.getVariantId(), orderId) == 0) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Imported variant does not exist in supplied order");
            }

            /*
              Step 2: Check total already imported quantity for this order.
              If total imported quantity + new imported quantity > supplied quantity, throw error
              Else, save new record to variant_import_receipts
             */
            long totalAlreadyImportedQuantity = variantsImportReceiptRepository
                .totalImportedQuantityOfVariantInOrder(lineItem.getVariantId(), orderId);
            long totalSuppliedQuantity = variantsOrderRepository
                .totalSuppliedQuantityOfVariantInOrder(lineItem.getVariantId(), orderId);
            if(totalAlreadyImportedQuantity + lineItem.getQuantity() > totalSuppliedQuantity) {
                throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Imported quantity of variant " + lineItem.getVariantId() + " cannot exceed supplied quantity"
                );
            }
            else if(totalAlreadyImportedQuantity + lineItem.getQuantity() < totalSuppliedQuantity) {
                importedStatus.set(ImportedStatus.PARTIAL_IMPORTED);
            }

            /*
            Step 3: Save this imported variant to the database
             */
            Variant variant = variantService.getVariantById(lineItem.getVariantId());
            VariantsImportReceipt variantsImportReceipt = variantsImportReceiptRepository.save(
                new VariantsImportReceipt(
                    variant,
                    importReceipt,
                    lineItem.getQuantity()
                )
            );

            /*
            Step 4: Update inventoryQuantity and sellableQuantity of the variant
             */
            variant.setInventoryQuantity(variant.getInventoryQuantity() + lineItem.getQuantity());
            variant.setSellableQuantity(variant.getSellableQuantity() + lineItem.getQuantity());
        });

        /*
        Step 5: Update imported status of order: Order.importedStatus
         */
        order.setImportedStatus(importedStatus.get());

        return importReceipt;
    }

    @Override
    public List<ImportReceipt> listAllImportReceiptsByOrder(long orderId) {
        return importReceiptRepository.findAllByOrder_Id(orderId);
    }
}
