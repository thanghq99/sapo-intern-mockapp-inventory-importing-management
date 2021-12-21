package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.Product;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> listAllProducts() {
        return productRepository.findAll();
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
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(long id, Product product) {
        //CHECK SKU CODE HERE
//        if(productRepository.existsByCode(product.getCode())) {
//            throw new UniqueKeyConstraintException("Supplier code already existed");
//        }
        Product productToUpdate = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("product not found"));
        productToUpdate.setName(product.getName());
        productToUpdate.setDescription(product.getDescription());
        productToUpdate.setImageUrl(product.getImageUrl());
        productToUpdate.setCategory(product.getCategory());
        //update brand?
        return productRepository.save(productToUpdate);
    }

    @Override
    public String deleteProduct(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }
        Product productToDelete = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("product not found"));
        productRepository.deleteById(id);
        return productToDelete.getName() + "was deleted!";
    }

}
