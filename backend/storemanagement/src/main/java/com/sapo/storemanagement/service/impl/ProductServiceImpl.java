package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.repository.VariantRepository;
import com.sapo.storemanagement.service.CategoryService;
import com.sapo.storemanagement.service.ProductService;
import com.sapo.storemanagement.service.VariantService;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VariantRepository variantRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private VariantService variantService;

    @Autowired
    @Qualifier("variant-code-generator")
    private ItemCodeGenerator itemCodeGenerator;

    @Override
    public List<Product> listAllProducts() {
        return productRepository.findAllByRecordStatus(RecordStatus.ACTIVE.getStatus());
    }

    @Override
    public Product getProductById(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }
        return productRepository
                        .findById(id)
                        .orElseThrow(() -> new RecordNotFoundException("product not found"));
    }

    @Override
    @Transactional
    public Product saveProduct(ProductVariantDto productVariantDto) {
        Category category = categoryService.getCategoryById(productVariantDto.getCategoryId());

        Product newProduct = productRepository.save(new Product(
            productVariantDto.getProductName(),
            category,
            productVariantDto.getBrand(),
            productVariantDto.getDescription(),
            productVariantDto.getWeight(),
            productVariantDto.getImageUrl(),
            SellableStatus.SELLABLE
        ));

//        Variant newVariant = new Variant(
//            newProduct, productVariantDto.getVariantCode(),
//            productVariantDto.getInventoryQuantity(), productVariantDto.getSellableQuantity(),
//            productVariantDto.getSize(), productVariantDto.getColor(),
//            productVariantDto.getMaterial(), productVariantDto.getUnit(),
//            productVariantDto.getOriginalPrice(), productVariantDto.getWholeSalePrice(), productVariantDto.getRetailPrice()
//        );
//        variantService.saveDefaultVariant(newVariant);
        List<Variant> newVariantsList = new ArrayList<Variant>();

        for (String color : productVariantDto.getColor()) {
            for (String material : productVariantDto.getMaterial()) {
                for (String size : productVariantDto.getSize()) {
                    Variant newVariant = new Variant(
                            newProduct,
                            itemCodeGenerator.generate(),
                            productVariantDto.getInventoryQuantity(),
                            productVariantDto.getSellableQuantity(),
                            size,
                            color,
                            material,
                            productVariantDto.getUnit(),
                            productVariantDto.getOriginalPrice(),
                            productVariantDto.getWholeSalePrice(),
                            productVariantDto.getRetailPrice()
                    );
                    newVariantsList.add(newVariant);
                    variantRepository.save(newVariant);
                }
            }
        }

        return newProduct;
    }

    @Override
    @Transactional
    public Product updateProduct(long id, ProductVariantDto productVariantDto) {
        Category category = categoryService.getCategoryById(productVariantDto.getCategoryId());

        Product productToUpdate = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("product not found"));
        productToUpdate.setName(productVariantDto.getProductName());
        productToUpdate.setCategory(category);
        productToUpdate.setDescription(productVariantDto.getDescription());
        productToUpdate.setImageUrl(productVariantDto.getImageUrl());
        productToUpdate.setBrand(productVariantDto.getBrand());
        productToUpdate.setWeight(productVariantDto.getWeight());
        return productRepository.save(productToUpdate);
    }

    @Override
    @Transactional
    public String deleteProduct(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }
        Product productToDelete = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("product not found"));
        productToDelete.setRecordStatus(RecordStatus.DELETED);

        variantService.listAllVariantsByProductId(productToDelete.getId())
            .forEach(variant -> variant.setRecordStatus(RecordStatus.DELETED));
        return productToDelete.getName() + "was deleted!";
    }

}
