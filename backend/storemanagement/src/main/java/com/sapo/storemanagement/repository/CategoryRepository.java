package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}