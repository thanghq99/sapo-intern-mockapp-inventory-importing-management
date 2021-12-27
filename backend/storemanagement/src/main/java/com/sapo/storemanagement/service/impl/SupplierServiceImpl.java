package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.RecordStatus;
import com.sapo.storemanagement.entities.Supplier;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.SupplierRepository;
import com.sapo.storemanagement.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Iterable<Supplier> listAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Supplier getSupplierById(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        return supplierRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Supplier not found"));
    }

    public Optional<Supplier> getSupplierByCode(String code) {
        return supplierRepository.findByCode(code);
    }

    @Override
    @Transactional
    public Supplier saveSupplier(Supplier supplier) {
        if(supplierRepository.existsByCode(supplier.getCode())) {
            throw new UniqueKeyConstraintException("Supplier code already existed");
        }
        return supplierRepository.save(supplier);
    }

    @Override
    @Transactional
    public Supplier updateSupplier(Long id, Supplier supplier) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        Supplier existingSupplier = this.getSupplierById(id);

        existingSupplier.setActivityStatus(supplier.getActivityStatus());
        existingSupplier.setAddress(supplier.getAddress());
        existingSupplier.setCode(supplier.getCode());
        existingSupplier.setDescription(supplier.getDescription());
        existingSupplier.setEmail(supplier.getEmail());
        existingSupplier.setFax(supplier.getFax());
        existingSupplier.setName(supplier.getName());
        existingSupplier.setPhone(supplier.getPhone());
        existingSupplier.setWebsite(supplier.getWebsite());

        return supplierRepository.save(existingSupplier);

    }

    @Override
    @Transactional
    public String deleteSupplier(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        Supplier supplier = this.getSupplierById(id);
        supplier.setRecordStatus(RecordStatus.DELETED);
        supplierRepository.save(supplier);

        return "delete supplier successful !!!";
    }
}
