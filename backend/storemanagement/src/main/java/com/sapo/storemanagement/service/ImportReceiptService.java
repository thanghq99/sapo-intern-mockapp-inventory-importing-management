package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.ImportReceipt;

import java.util.List;

public interface ImportReceiptService {
    List<ImportReceipt> listAllImportReceipts();

    ImportReceipt getImportReceiptById(long id);

    ImportReceipt saveImportReceipt(ImportReceipt paymentInvoice);
}
