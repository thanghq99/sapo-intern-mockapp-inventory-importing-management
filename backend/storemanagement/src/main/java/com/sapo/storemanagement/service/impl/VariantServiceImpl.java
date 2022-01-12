package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.dto.VariantsListDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.ForeignKeyConstraintException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.repository.VariantRepository;
import com.sapo.storemanagement.repository.VariantsOrderRepository;
import com.sapo.storemanagement.service.VariantService;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class VariantServiceImpl implements VariantService {
    private final VariantRepository variantRepository;
    private final ProductRepository productRepository;
    private final VariantsOrderRepository variantsOrderRepository;

    @Autowired
    @Qualifier("variant-code-generator")
    private ItemCodeGenerator itemCodeGenerator;

    @Autowired
    public VariantServiceImpl(VariantRepository variantRepository, ProductRepository productRepository,
            VariantsOrderRepository variantsOrderRepository) {
        this.variantRepository = variantRepository;
        this.productRepository = productRepository;
        this.variantsOrderRepository = variantsOrderRepository;
    }

    @Override
    public List<Variant> listAllVariants() {
        return variantRepository.findAllByRecordStatus(RecordStatus.ACTIVE.getStatus());
    }

    @Override
    public List<Variant> listAllVariantsByProductId(Long id) {
        return variantRepository.findAllByProductId(id);
    }

    @Override
    public List<VariantsOrder> listVariantByOrderId(long orderId) {
        List<VariantsOrder> variantListByOrder = variantsOrderRepository.findVariantByOrderId(orderId);
        // List<Variant> variantList = null;
        // variantListByOrder.forEach((item) -> {
        // Variant variant =
        // variantRepository.findById(item.getVariant().getId()).orElseThrow(() -> new
        // RecordNotFoundException("variant not found"));
        // variantList.add(variant);
        // });
        return variantListByOrder;
    }

    @Override
    public Variant getVariantById(Long id) {
        if (id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        return variantRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Variant not found"));
    }

    @Override
    @Transactional
    public Variant saveDefaultVariant(Variant variant) {
        // check unique key constraint
        if (variantRepository.existsByCode(variant.getCode())) {
            throw new UniqueKeyConstraintException("Variant code already existed");
        }

        // check foreign key constraint
        if (!productRepository.existsById(variant.getProduct().getId())) {
            throw new ForeignKeyConstraintException("Referenced product does not exist");
        }

        return variantRepository.save(variant);
    }

    @Override
    public Variant saveVariant(ProductVariantDto productVariantDto) {
        return null;
    }

    // @Override
    // @Transactional
    // public Variant saveVariant(ProductVariantDto productVariantDto) {
    // Product product =
    // productRepository.findById(productVariantDto.getProductId()).get();
    // if(variantRepository.existsByCode(productVariantDto.getVariantCode())) {
    // throw new UniqueKeyConstraintException("Variant code duplicated");
    // }
    // Variant newVariant = new Variant(
    // product,
    // productVariantDto.getVariantCode(),
    // productVariantDto.getInventoryQuantity(),
    // productVariantDto.getSellableQuantity(),
    // productVariantDto.getSize(), productVariantDto.getColor(),
    // productVariantDto.getMaterial(), productVariantDto.getUnit(),
    // productVariantDto.getOriginalPrice(), productVariantDto.getWholeSalePrice(),
    // productVariantDto.getRetailPrice()
    // );
    // return variantRepository.save(newVariant);
    // }
    @Override
    @Transactional
    public List<Variant> saveVariant(VariantsListDto variantDto) {
        Product product = productRepository.findById(3L).get();
        // if(variantRepository.existsByCode(variantDto.getCode())) {
        // throw new UniqueKeyConstraintException("Variant code duplicated");
        // }
        List<Variant> newVariantsList = new ArrayList<Variant>();

        for (String color : variantDto.getColor()) {
            for (String material : variantDto.getMaterial()) {
                for (String size : variantDto.getSize()) {
                    Variant newVariant = new Variant(
                            product,
                            // variantDto.getCode() +
                            // GetVariantPostfixAttribute.getVariantPostfixAttribute(size)
                            // + GetVariantPostfixAttribute.getVariantPostfixAttribute(color)
                            // + GetVariantPostfixAttribute.getVariantPostfixAttribute(material),
                            // variantDto.getCode(),
                            itemCodeGenerator.generate(),
                            variantDto.getInventoryQuantity(),
                            variantDto.getSellableQuantity(),
                            size,
                            color,
                            material,
                            variantDto.getUnit(),
                            variantDto.getOriginalPrice(),
                            variantDto.getWholeSalePrice(),
                            variantDto.getRetailPrice());
                    newVariantsList.add(newVariant);
                    variantRepository.save(newVariant);
                }
            }
        }

        return newVariantsList;
    }

    @Override
    @Transactional
    public Variant updateVariant(long id, ProductVariantDto productVariantDto) {
        if (id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        Variant existingVariant = this.getVariantById(id);

        // check unique key constraint
        if (!existingVariant.getCode().equals(productVariantDto.getVariantCode()) &&
                variantRepository.existsByCode(productVariantDto.getVariantCode())) {
            throw new UniqueKeyConstraintException("Variant code already existed");
        }

        // check foreign key constraint
        if (!productRepository.existsById(productVariantDto.getProductId())) {
            throw new ForeignKeyConstraintException("Referenced product does not exist");
        }

        // existingVariant.setCode(productVariantDto.getVariantCode());
        // existingVariant.setColor(productVariantDto.getColor());
        // existingVariant.setMaterial(productVariantDto.getMaterial());
        // existingVariant.setInventoryQuantity(productVariantDto.getInventoryQuantity());
        // existingVariant.setSellableQuantity(productVariantDto.getSellableQuantity());
        // existingVariant.setOriginalPrice(productVariantDto.getOriginalPrice());
        // existingVariant.setRetailPrice(productVariantDto.getRetailPrice());
        // existingVariant.setWholeSalePrice(productVariantDto.getWholeSalePrice());
        // existingVariant.setSize(productVariantDto.getSize());
        // existingVariant.setUnit(productVariantDto.getUnit());

        return variantRepository.save(existingVariant);
    }

    @Override
    @Transactional
    public Variant deleteVariant(Long id) {
        Variant variant = this.getVariantById(id);
        variant.setRecordStatus(RecordStatus.DELETED);
        variantRepository.save(variant);

        return variant;
    }
}
