package com.sapo.storemanagement.dto;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class VariantsListDto {
    @NotNull(message = "Mã phiên bản không được null")
    @Size(max = 16, message = "Độ dài mã phiên bản không được vượt quá {max} kí tự")
    private String code;

    @NotNull(message = "Đơn vị tính phiên bản không được null")
    @Size(max = 16, message = "Độ dài đơn vị tính phiên bản không được vượt quá {max} kí tự")
    private String unit;

    private List<String> size;
    private List<String> color;
    private List<String> material;

    @NotNull(message = "Hãy nhập giá bán lẻ của phiên bản")
    @Min(value = 0, message = "Giá bán lẻ không được nhỏ hơn {value}")
    private Double retailPrice;

    @NotNull(message = "Hãy nhập giá bán buôn của phiên bản")
    @Min(value = 0, message = "Giá bán buôn không được nhỏ hơn {value}")
    private Double wholeSalePrice;

    @NotNull(message = "Hãy nhập giá nhập của phiên bản")
    @Min(value = 0, message = "Giá nhập không được nhỏ hơn {value}")
    private Double originalPrice;

    @NotNull(message = "Lượng hàng tồn kho không được null")
    @Min(value = 0, message = "Lượng hàng tồn kho không được nhỏ hơn {value}")
    private Long inventoryQuantity;

    @NotNull(message = "Lượng hàng có thể bán không được null")
    @Min(value = 0, message = "Lượng hàng có thể bán không được nhỏ hơn {value}")
    private Long sellableQuantity;

    public String getCode() { return code; }

    public List<String> getSize() { return size; }

    public String getUnit() { return unit; }

    public List<String> getColor() { return color; }

    public List<String> getMaterial() { return material; }

    public Double getRetailPrice() {
        return retailPrice;
    }

    public Double getWholeSalePrice() {
        return wholeSalePrice;
    }

    public Double getOriginalPrice() {
        return originalPrice;
    }

    public Long getInventoryQuantity() {
        return inventoryQuantity;
    }

    public Long getSellableQuantity() {
        return sellableQuantity;
    }
}
