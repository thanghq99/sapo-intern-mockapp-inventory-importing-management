package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.Supplier;
import com.sapo.storemanagement.repository.SupplierRepository;
import com.sapo.storemanagement.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {

    private SupplierRepository supplierRepository;

    @Override
    public Iterable<Supplier> listAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Optional<Supplier> getSupplierById(Long id) {
        return supplierRepository.findById(id);
    }

//    public Optional<Supplier> getSupplierByCode(String code) {
//        return supplierRepository.findByCode(code);
//    }

    @Override
    public Supplier saveSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier updateSupplier(Supplier supplier) {
        Supplier existingSupplier = supplierRepository.findById(supplier.getId()).orElse(null);

        assert existingSupplier != null;
        existingSupplier.setActivityStatus(supplier.getActivityStatus());
        existingSupplier.setAddress(supplier.getAddress());
        existingSupplier.setCode(supplier.getCode());
        existingSupplier.setDescription(supplier.getDescription());
        existingSupplier.setEmail(supplier.getEmail());
        existingSupplier.setFax(supplier.getFax());
        existingSupplier.setName(supplier.getName());
        existingSupplier.setPhone(supplier.getPhone());
        existingSupplier.setRecordStatus(supplier.getRecordStatus());
        existingSupplier.setWebsite(supplier.getWebsite());

        return supplierRepository.save(existingSupplier);

    }

    @Override
    public String deleteSupplier(Long id) {
        supplierRepository.deleteById(id);
        return "delete supplier successful !!!";
    }
}
