package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Supplier;

public interface SupplierService {

    Iterable<Supplier> listAllSuppliers();

    Supplier getSupplierById(Long id);

    Supplier saveSupplier(Supplier supplier);

    Supplier updateSupplier(long id, Supplier supplier);

    String deleteSupplier(Long id);

}
