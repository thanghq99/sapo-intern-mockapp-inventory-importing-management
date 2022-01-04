package com.sapo.storemanagement.service;

import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.entities.Variant;

import java.util.List;

public interface VariantService {

    List<Variant> listAllVariants();

    List<Variant> listAllVariantsByProductId(Long id);

    Variant getVariantById(Long id);

    Variant saveDefaultVariant(Variant variant);

    Variant saveVariant(ProductVariantDto productVariantDto);

    Variant updateVariant(long id, Variant variant);

    String deleteVariant(Long id);
}
