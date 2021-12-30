package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Supplier;

import java.util.Optional;

public interface SupplierService {

    Iterable<Supplier> listAllSuppliers();

    Optional<Supplier> listAllSuppliersByCode(String status);

    Supplier getSupplierById(Long id);

    Supplier saveSupplier(Supplier supplier);

    Supplier updateSupplier(long id, Supplier supplier);

    String deleteSupplier(Long id);

    Supplier decreaseDebt(long supplierId, double offset);

    Supplier increaseDebt(long supplierId, double offset);

}
