package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.ProductDto;
import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.entities.Product;

public interface ProductService {
    Iterable<Product> listAllProducts();

    Product getProductById(Long id);

    Product saveProduct(ProductVariantDto productVariantDto);

    Product updateProduct(long id, ProductDto productDto);

    String deleteProduct(Long id);
}
