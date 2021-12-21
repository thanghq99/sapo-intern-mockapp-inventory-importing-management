package com.sapo.storemanagement.controller;

import com.sapo.storemanagement.entities.Category;
import com.sapo.storemanagement.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/{id}")
    public Category findSupplierById(@PathVariable long id){
        return categoryService.getCategoryById(id);
    }

    @GetMapping
    public List<Category> findAllSuppliers(){
        return categoryService.listAllCategories();
    }

    @PostMapping
    public Category createSupplier(@RequestBody Category category){
        return categoryService.saveCategory(category);
    }
}
