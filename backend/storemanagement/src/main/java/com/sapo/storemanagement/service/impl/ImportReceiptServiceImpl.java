package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.ImportReceipt;
import com.sapo.storemanagement.entities.ImportedStatus;
import com.sapo.storemanagement.entities.Order;
import com.sapo.storemanagement.entities.OrderStatus;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.ForeignKeyConstraintException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.ImportReceiptRepository;
import com.sapo.storemanagement.repository.OrderRepository;
import com.sapo.storemanagement.repository.UserRepository;
import com.sapo.storemanagement.service.ImportReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImportReceiptServiceImpl implements ImportReceiptService {
    private final ImportReceiptRepository importReceiptRepository;
    private final OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public ImportReceiptServiceImpl(ImportReceiptRepository importReceiptRepository, OrderRepository orderRepository) {
        this.importReceiptRepository = importReceiptRepository;
        this.orderRepository = orderRepository;
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
    public ImportReceipt saveImportReceipt(ImportReceipt importReceipt) {
        // check unique key constraint
        if(importReceiptRepository.existsByCode(importReceipt.getCode())) {
            throw new UniqueKeyConstraintException("Import receipt's code already existed");
        }

        // check foreign key constraint
        if(!userRepository.existsById(importReceipt.getCreatedBy().getId())) {
            throw new ForeignKeyConstraintException("Import receipt's creator does not exist");
        }

        Order order = orderRepository
            .findById(importReceipt.getOrder().getId())
            .orElseThrow(() -> new ForeignKeyConstraintException("Referenced order does not exist"));

        if(!order.getImportedStatus().equals(ImportedStatus.AWAITING.getStatus()) ||
            !order.getStatus().equals(OrderStatus.PROCESSING.getStatus())) {
            throw new IllegalStateException("Order is not in awaiting status");
        }
        order.setImportedStatus(ImportedStatus.IMPORTED);

        return importReceiptRepository.save(importReceipt);
    }
}
