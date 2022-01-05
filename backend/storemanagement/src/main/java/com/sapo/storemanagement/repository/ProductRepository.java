package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
//    boolean existsByCode(String code);

    @Query(value = "select * from products where record_status like :record_status ", nativeQuery = true)
    List<Product> findAllByRecordStatus(@Param("record_status") String recordStatus);
}