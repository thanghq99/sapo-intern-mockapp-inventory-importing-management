package com.sapo.storemanagement.repository;

import com.sapo.storemanagement.entities.Variant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VariantRepository extends JpaRepository<Variant, Long> {
    Optional<Variant> findByCode(String code);

    boolean existsByCode(String code);

    @Query(
        value = "SELECT * FROM variants WHERE product_id = :product_id",
        nativeQuery = true
    )
    List<Variant> findAllByProductId(@Param("product_id") Long id);
}