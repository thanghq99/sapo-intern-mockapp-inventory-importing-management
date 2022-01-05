package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.ForeignKeyConstraintException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.repository.VariantRepository;
import com.sapo.storemanagement.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VariantServiceImpl implements VariantService {
    private final VariantRepository variantRepository;
    private final ProductRepository productRepository;

    @Autowired
    public VariantServiceImpl(VariantRepository variantRepository, ProductRepository productRepository) {
        this.variantRepository = variantRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<Variant> listAllVariants() {
        return variantRepository.findAll();
    }

    @Override
    public List<Variant> listAllVariantsByProductId(Long id) {
        return variantRepository.findAllByProductId(id);
    }

    @Override
    public Variant getVariantById(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        return variantRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Variant not found"));
    }

    @Override
    @Transactional
    public Variant saveDefaultVariant(Variant variant) {
        // check unique key constraint
        if(variantRepository.existsByCode(variant.getCode())) {
            throw new UniqueKeyConstraintException("Variant code already existed");
        }

        // check foreign key constraint
        if(!productRepository.existsById(variant.getProduct().getId())) {
            throw new ForeignKeyConstraintException("Referenced product does not exist");
        }

        return variantRepository.save(variant);
    }

    @Override
    @Transactional
    public Variant saveVariant(ProductVariantDto productVariantDto) {
        Product product = productRepository.findById(productVariantDto.getProductId()).get();
        Variant newVariant = new Variant(
                product,
                productVariantDto.getVariantCode(),
                productVariantDto.getInventoryQuantity(), productVariantDto.getSellableQuantity(),
                productVariantDto.getSize(), productVariantDto.getColor(),
                productVariantDto.getMaterial(), productVariantDto.getUnit(),
                productVariantDto.getOriginalPrice(), productVariantDto.getWholeSalePrice(), productVariantDto.getRetailPrice()
        );
        return variantRepository.save(newVariant);
    }

    @Override
    @Transactional
    public Variant updateVariant(long id, ProductVariantDto productVariantDto) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        Variant existingVariant = this.getVariantById(id);

        // check unique key constraint
        if(!existingVariant.getCode().equals(productVariantDto.getVariantCode()) &&
            variantRepository.existsByCode(productVariantDto.getVariantCode())) {
            throw new UniqueKeyConstraintException("Variant code already existed");
        }

        // check foreign key constraint
        if(!productRepository.existsById(productVariantDto.getProductId())) {
            throw new ForeignKeyConstraintException("Referenced product does not exist");
        }

        existingVariant.setCode(productVariantDto.getVariantCode());
        existingVariant.setColor(productVariantDto.getColor());
        existingVariant.setMaterial(productVariantDto.getMaterial());
        existingVariant.setInventoryQuantity(productVariantDto.getInventoryQuantity());
        existingVariant.setSellableQuantity(productVariantDto.getSellableQuantity());
        existingVariant.setOriginalPrice(productVariantDto.getOriginalPrice());
        existingVariant.setRetailPrice(productVariantDto.getRetailPrice());
        existingVariant.setWholeSalePrice(productVariantDto.getWholeSalePrice());
        existingVariant.setSize(productVariantDto.getSize());
        existingVariant.setUnit(productVariantDto.getUnit());

        return variantRepository.save(existingVariant);
    }

    @Override
    @Transactional
    public String deleteVariant(Long id) {
        Variant variant = this.getVariantById(id);
        variant.setRecordStatus(RecordStatus.DELETED);
        variantRepository.save(variant);

        return "Delete Variant " + id;
    }
}
