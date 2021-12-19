package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.service.ImportReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/import-receipts")
public class ImportReceiptController {
    private final ImportReceiptService importReceiptService;

    @Autowired
    public ImportReceiptController(ImportReceiptService importReceiptService) {
        this.importReceiptService = importReceiptService;
    }
}
