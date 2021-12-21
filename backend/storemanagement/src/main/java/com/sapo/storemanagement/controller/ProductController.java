package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.entities.Product;
import com.sapo.storemanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/san-pham")
    ResponseEntity listAllProducts() {
        List<Product> itemEntities = (List<Product>) productService.listAllProducts();
        if (itemEntities.isEmpty()) return ResponseEntity.ok().body("No item found!");
        else return ResponseEntity.ok().body(itemEntities);
    }

    @GetMapping("/san-pham/{id}")
    ResponseEntity getProductById(@PathVariable(name = "id") long id) {
        Product itemEntity = productService.getProductById(id);
        if (itemEntity != null) return ResponseEntity.ok().body(itemEntity);
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/san-pham")
    ResponseEntity saveProduct(Product productEntity) {
        if(productService.saveProduct(productEntity) != null) return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/san-pham/{id}")
    ResponseEntity updateProduct(@PathVariable(name = "id") long id, @RequestBody Product productEntity) {
        if (productService.updateProduct(id, productEntity) != null) return ResponseEntity.ok().body(productService.getProductById(id));
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/san-pham/{id}")
    ResponseEntity<String> deleteProduct(@PathVariable(name = "id") long id) {
        return new ResponseEntity<String>(productService.deleteProduct(id),HttpStatus.OK);
    }

}
