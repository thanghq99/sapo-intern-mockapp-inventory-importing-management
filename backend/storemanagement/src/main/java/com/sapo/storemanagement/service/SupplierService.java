package com.sapo.storemanagement.service;


import com.sapo.storemanagement.entities.Supplier;

import java.util.Optional;

public interface SupplierService {

    Iterable<Supplier> listAllSuppliers();

    Optional<Supplier> getSupplierById(Long id);

    Supplier saveSupplier(Supplier supplier);

    Supplier updateSupplier(Supplier supplier);

    String deleteSupplier(Long id);

}
