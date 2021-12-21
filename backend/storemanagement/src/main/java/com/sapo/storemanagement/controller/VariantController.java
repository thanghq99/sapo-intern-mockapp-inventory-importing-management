package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.entities.Variant;
import com.sapo.storemanagement.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/variants")
public class VariantController {
    private final VariantService variantService;

    @Autowired
    public VariantController(VariantService variantService) {
        this.variantService = variantService;
    }

    @GetMapping("/{id}")
    public Variant findVariantById(@PathVariable long id){
        return variantService.getVariantById(id);
    }

    @GetMapping
    public List<Variant> findAllVariants(){
        return variantService.listAllVariants();
    }

    @PostMapping
    public Variant createVariant(@RequestBody Variant variant){
        return variantService.saveVariant(variant);
    }

    @PutMapping("/{id}")
    public Variant updateVariant(@PathVariable long id, @RequestBody Variant variant){
        return variantService.updateVariant(id, variant);
    }

    @DeleteMapping("/{id}")
    public String deleteVariant(@PathVariable long id){
        return variantService.deleteVariant(id);
    }
}
