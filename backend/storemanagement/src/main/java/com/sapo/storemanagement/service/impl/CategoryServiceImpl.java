package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.entities.Category;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.repository.CategoryRepository;
import com.sapo.storemanagement.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> listAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Category not found"));
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
}
