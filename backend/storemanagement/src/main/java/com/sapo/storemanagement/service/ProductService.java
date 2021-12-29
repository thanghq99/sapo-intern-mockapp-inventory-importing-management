package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.entities.Product;

public interface ProductService {
    Iterable<Product> listAllProducts();

    Product getProductById(Long id);

    Product saveProduct(ProductVariantDto productVariantDto);

    Product updateProduct(long id, Product product);

    String deleteProduct(Long id);
}
