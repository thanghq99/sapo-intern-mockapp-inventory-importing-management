package com.sapo.storemanagement.service.impl;

import com.sapo.storemanagement.dto.ProductDto;
import com.sapo.storemanagement.dto.ProductVariantDto;
import com.sapo.storemanagement.dto.VariantDto;
import com.sapo.storemanagement.entities.*;
import com.sapo.storemanagement.exception.BadNumberException;
import com.sapo.storemanagement.exception.RecordNotFoundException;
import com.sapo.storemanagement.exception.UniqueKeyConstraintException;
import com.sapo.storemanagement.repository.ProductRepository;
import com.sapo.storemanagement.repository.VariantRepository;
import com.sapo.storemanagement.service.CategoryService;
import com.sapo.storemanagement.service.ProductService;
import com.sapo.storemanagement.service.VariantService;
import com.sapo.storemanagement.utils.InputStringModifier;
import com.sapo.storemanagement.utils.itemcodegenerator.ItemCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VariantRepository variantRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private VariantService variantService;

    @Autowired
    @Qualifier("variant-code-generator")
    private ItemCodeGenerator itemCodeGenerator;

    @Override
    public List<Product> listAllProducts() {
        return productRepository.findAllByRecordStatus(RecordStatus.ACTIVE.getStatus());
    }

    @Override
    public Product getProductById(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }
        return productRepository
                        .findById(id)
                        .orElseThrow(() -> new RecordNotFoundException("product not found"));
    }

    @Override
    @Transactional
    public Product saveProduct(ProductVariantDto productVariantDto) {
        if(productVariantDto.getProductName().equals("")) throw new BadNumberException("Không được bỏ trống tên sản phẩm");
        if(productVariantDto.getCategoryId() == null) throw new BadNumberException("Không được bỏ trống loại sản phẩm");

        Category category = categoryService.getCategoryById(productVariantDto.getCategoryId());

        String productName = productVariantDto.getProductName();
        Product newProduct = productRepository.save(new Product(
            InputStringModifier.capitalizeFirstWord(productName),
            category,
                productVariantDto.getBrand(),
                productVariantDto.getDescription(),
            productVariantDto.getWeight(),
            productVariantDto.getImageUrl(),
            SellableStatus.SELLABLE
        ));

        List<Variant> newVariantsList = new ArrayList<Variant>();

        List<String> colors = new ArrayList<String>(productVariantDto.getColor());
        List<String> materials = new ArrayList<String>(productVariantDto.getMaterial());
        List<String> sizes = new ArrayList<String>(productVariantDto.getSize());
        int colorNumbers = colors.size();
        int materialNumbers = materials.size();
        int sizeNumbers = sizes.size();

        if(colorNumbers == 0 && materialNumbers == 0 && sizeNumbers == 0) {
            Variant newVariant = new Variant(
                    newProduct,
                    itemCodeGenerator.generate(),
                    productVariantDto.getInventoryQuantity(),
                    productVariantDto.getSellableQuantity(),
                    "",
                    "",
                    "",
                    productVariantDto.getUnit(),
                    productVariantDto.getOriginalPrice(),
                    productVariantDto.getWholeSalePrice(),
                    productVariantDto.getRetailPrice()
            );
            variantRepository.save(newVariant);
        } else {
            if(colorNumbers == 0) colors.add(0, "");
            if(sizeNumbers == 0) sizes.add(0, "");
            if(materialNumbers == 0) materials.add(0, "");
            for (String color : colors) {
                for (String material : materials) {
                    for (String size : sizes) {
                        Variant newVariant = new Variant(
                                newProduct,
                                itemCodeGenerator.generate(),
                                productVariantDto.getInventoryQuantity(),
                                productVariantDto.getSellableQuantity(),
                                size,
                                color,
                                material,
                                productVariantDto.getUnit(),
                                productVariantDto.getOriginalPrice(),
                                productVariantDto.getWholeSalePrice(),
                                productVariantDto.getRetailPrice()
                        );
                        newVariantsList.add(newVariant);
                        variantRepository.save(newVariant);
                    }
                }
            }
        }
        return newProduct;
    }

    @Override
    @Transactional
    public Product updateProduct(long id, ProductDto productDto) {
        if(productDto.getProductName().equals("")) throw new BadNumberException("Không được bỏ trống tên sản phẩm");

        Category category = categoryService.getCategoryById(productDto.getCategoryId());

        Product productToUpdate = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("product not found"));
        productToUpdate.setName(productDto.getProductName());
        productToUpdate.setCategory(category);
        productToUpdate.setDescription(productDto.getDescription());
        productToUpdate.setImageUrl(productDto.getImageUrl());
        productToUpdate.setBrand(productDto.getBrand());
        productToUpdate.setWeight(productDto.getWeight());
        return productRepository.save(productToUpdate);
    }

    @Override
    @Transactional
    public String deleteProduct(Long id) {
        if(id <= 0) {
            throw new BadNumberException("id must be greater than 0");
        }
        Product productToDelete = productRepository
                .findById(id)
                .orElseThrow(() -> new RecordNotFoundException("product not found"));
        productToDelete.setRecordStatus(RecordStatus.DELETED);

        variantService.listAllVariantsByProductId(productToDelete.getId())
            .forEach(variant -> variant.setRecordStatus(RecordStatus.DELETED));
        return productToDelete.getName() + "was deleted!";
    }

    @Override
    public Variant saveVariant(long id, VariantDto variantDto) {
        if(variantRepository.existsByCode(variantDto.getVariantCode())) {
            throw new UniqueKeyConstraintException("Mã phiên bản sản phẩm bị trùng với phiên bản khác");
        }
        if(variantDto.getVariantCode().equals("")) throw new BadNumberException("Không được bỏ trống mã phiên bản");
        if(variantDto.getRetailPrice() == null) throw new BadNumberException("Không được bỏ trống giá bán lẻ");
        if(variantDto.getWholeSalePrice() == null) throw new BadNumberException("Không được bỏ trống giá bán buôn");
        if(variantDto.getOriginalPrice() == null) throw new BadNumberException("Không được bỏ trống giá nhập");
        if(variantDto.getInventoryQuantity() == null) throw new BadNumberException("Không được bỏ trống số lượng trong kho");
        if(variantDto.getSellableQuantity() == null) throw new BadNumberException("Không được bỏ trống số lượng có thể bán");
        Product product = productRepository.findById(id).get();
        Variant newVariant = new Variant(
                product,
                variantDto.getVariantCode(),
                variantDto.getInventoryQuantity(),
                variantDto.getSellableQuantity(),
                variantDto.getSize(),
                variantDto.getColor(),
                variantDto.getMaterial(),
                variantDto.getUnit(),
                variantDto.getOriginalPrice(),
                variantDto.getWholeSalePrice(),
                variantDto.getRetailPrice()
        );
        return variantRepository.save(newVariant);
    }

}
