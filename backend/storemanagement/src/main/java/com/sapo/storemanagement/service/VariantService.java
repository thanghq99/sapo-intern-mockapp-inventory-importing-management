package com.sapo.storemanagement.service;

import com.sapo.storemanagement.entities.Variant;
import com.sapo.storemanagement.entities.VariantsOrder;

import java.util.List;

public interface VariantService {

    List<Variant> listAllVariants();

    List<VariantsOrder> listVariantByOrderId(long orderId);

    Variant getVariantById(Long id);

    Variant saveVariant(Variant variant);

    Variant updateVariant(long id, Variant variant);

    String deleteVariant(Long id);
}
