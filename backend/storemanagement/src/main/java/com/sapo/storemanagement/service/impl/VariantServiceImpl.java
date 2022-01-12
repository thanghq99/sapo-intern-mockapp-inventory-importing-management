package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.dto.VariantDto;
import com.sapo.storemanagement.dto.VariantsListDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.ForeignKeyConstraintException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.repository.VariantRepository;
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

    @Autowired
    @Qualifier("variant-code-generator")
    private ItemCodeGenerator itemCodeGenerator;

    @Autowired
    public VariantServiceImpl(VariantRepository variantRepository, ProductRepository productRepository) {
        this.variantRepository = variantRepository;
        this.productRepository = productRepository;
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
    public Variant getVariantById(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }

        return variantRepository
            .findById(id)
            .orElseThrow(() -> new RecordNotFoundException("Variant not found"));
    }

    @Override
    @Transactional
    public Variant updateVariant(long id, VariantDto variantDto) {
//        if(variantRepository.existsByCode(variantDto.getVariantCode())) {
//            throw new UniqueKeyConstraintException("Mã phiên bản sản phẩm bị trùng với phiên bản khác");
//        }
//        if(variantDto.getVariantCode().equals("")) throw new BadNumberException("Không được bỏ trống mã phiên bản");
////        if(variantDto.getRetailPrice() == null) throw new BadNumberException("Không được bỏ trống giá bán lẻ");
//        if(variantDto.getWholeSalePrice() == null) throw new BadNumberException("Không được bỏ trống giá bán buôn");
//        if(variantDto.getOriginalPrice() == null) throw new BadNumberException("Không được bỏ trống giá nhập");
//        if(variantDto.getInventoryQuantity() == null) throw new BadNumberException("Không được bỏ trống số lượng trong kho");
//        if(variantDto.getSellableQuantity() == null) throw new BadNumberException("Không được bỏ trống số lượng có thể bán");

        Variant existingVariant = this.getVariantById(id);

        // check unique key constraint
//        if(!existingVariant.getCode().equals(variantDto.getVariantCode()) &&
//            variantRepository.existsByCode(variantDto.getVariantCode())) {
//            throw new UniqueKeyConstraintException("Mã phiên bản sản phẩm bị trùng với phiên bản khác");
//        }

        // cái này chắc không thể xảy ra
        // check foreign key constraint
//        if(!productRepository.existsById(existingVariant.getProduct().getId())) {
//            throw new ForeignKeyConstraintException("Không tìm thấy sản phẩm ứng với phiên bản này");
//        }

        existingVariant.setCode(variantDto.getVariantCode());
        existingVariant.setInventoryQuantity(variantDto.getInventoryQuantity());
        existingVariant.setSellableQuantity(variantDto.getSellableQuantity());
        existingVariant.setColor(variantDto.getColor());
        existingVariant.setMaterial(variantDto.getMaterial());
        existingVariant.setSize(variantDto.getSize());
        existingVariant.setUnit(variantDto.getUnit());
        existingVariant.setRetailPrice(variantDto.getRetailPrice());
        existingVariant.setWholeSalePrice(variantDto.getWholeSalePrice());
        existingVariant.setOriginalPrice(variantDto.getOriginalPrice());

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

    @Override
    public String getLastestVariantCode() {
        return itemCodeGenerator.generate();
    }
}
