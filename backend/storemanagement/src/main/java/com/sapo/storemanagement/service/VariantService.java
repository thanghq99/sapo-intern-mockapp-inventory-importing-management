package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Variant;

import java.util.List;

public interface VariantService {

    List<Variant> listAllVariants();

    Variant getVariantById(Long id);

    Variant saveVariant(Variant variant);

    Variant updateVariant(long id, Variant variant);

    String deleteVariant(Long id);
}
