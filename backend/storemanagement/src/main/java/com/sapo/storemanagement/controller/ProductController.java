package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.entities.Product;
import com.sapo.storemanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/san-pham")
    public Iterable<Product> listAllProducts() { return productService.listAllProducts(); }

    @GetMapping("/san-pham/{id}")
    Product getProductById(@PathVariable(name = "id") long id) { return productService.getProductById(id); }

    @PostMapping("/san-pham")
    Product saveProduct(Product productEntity) {
        return productService.saveProduct(productEntity);
    }

    @PutMapping("/san-pham/{id}")
    Product updateProduct(@PathVariable(name = "id") long id, @RequestBody Product productEntity) {
        return productService.updateProduct(id, productEntity);
    }

    @DeleteMapping("/san-pham/{id}")
    ResponseEntity<String> deleteProduct(@PathVariable(name = "id") long id) {
        return new ResponseEntity<String>(productService.deleteProduct(id),HttpStatus.OK);
    }

}
