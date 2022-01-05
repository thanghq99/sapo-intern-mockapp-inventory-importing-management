package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.entities.Category;
import com.sapo.storemanagement.entities.Product;
import com.sapo.storemanagement.entities.SellableStatus;
import com.sapo.storemanagement.entities.Variant;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.service.CategoryService;
import com.sapo.storemanagement.service.ProductService;
import com.sapo.storemanagement.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private VariantService variantService;

    @Override
    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        if (id <= 0) {
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
                SellableStatus.SELLABLE));

        Variant newVariant = new Variant(
                newProduct, productVariantDto.getVariantCode(),
                productVariantDto.getInventoryQuantity(), productVariantDto.getSellableQuantity(),
                productVariantDto.getSize(), productVariantDto.getColor(),
                productVariantDto.getMaterial(), productVariantDto.getUnit(),
                productVariantDto.getOriginalPrice(), productVariantDto.getWholeSalePrice(),
                productVariantDto.getRetailPrice());
        variantService.saveVariant(newVariant);

        return newProduct;
    }

    @Override
    @Transactional
    public Product updateProduct(long id, Product product) {
        Product productToUpdate = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("product not found"));
        productToUpdate.setName(product.getName());
        productToUpdate.setDescription(product.getDescription());
        productToUpdate.setImageUrl(product.getImageUrl());
        productToUpdate.setCategory(product.getCategory());
        productToUpdate.setBrand(product.getBrand());
        return productRepository.save(productToUpdate);
    }

    @Override
    @Transactional
    public String deleteProduct(Long id) {
        if (id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }
        Product productToDelete = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("product not found"));
        productRepository.deleteById(id);
        return productToDelete.getName() + "was deleted!";
    }

}
