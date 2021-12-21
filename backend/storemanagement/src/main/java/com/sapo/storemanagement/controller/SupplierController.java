package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.entities.Supplier;
import com.sapo.storemanagement.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suppliers")
@CrossOrigin

public class SupplierController {
    @Autowired
    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping("/{id}")
    public Supplier findSupplierById(@PathVariable long id){
        return supplierService.getSupplierById(id);
    }

    @GetMapping
    public Iterable<Supplier> findAllSuppliers(){
        return supplierService.listAllSuppliers();
    }

    @PostMapping
    public Supplier createSupplier(@RequestBody Supplier supplier){
        return supplierService.saveSupplier(supplier);
    }

    @PutMapping("/{id}")
    public Supplier updateSupplier(@PathVariable long id, @RequestBody Supplier supplier){
        return supplierService.updateSupplier(id, supplier);
    }

    @DeleteMapping("/{id}")
    public String deleteSupplier(@PathVariable long id){
        return supplierService.deleteSupplier(id);
    }

}
