import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  TextField,
  Switch,
} from "@mui/material";
import ProductAPI from "../../api/ProductAPI";

function EditVariant({ productId, triggerReload, setViewState, variantData, setStateAlert }) {
  const [variantInfo, setVariantInfo] = useState(variantData);

  function handleChange(evt) {
    const value = evt.target.value;
    setVariantInfo({
      ...variantInfo,
      [evt.target.name]: value,
    });
  }

  const handleChangeSellableStatus = (evt) => {
    const value = evt.target.checked;
    setVariantInfo({
      ...variantInfo,
      ["sellableStatus"]: value,
    });
  };

  const cancelAction = () => {
    setStateAlert({ severity: "warning", variant: "filled", open: true, content: "Đã hủy chỉnh sửa phiên bản sản phẩm" });
    setViewState(1);
  }

  function handleUpdateVariant() {
    console.log({
      variantCode: variantInfo.code,
      inventoryQuantity: variantInfo.inventoryQuantity,
      sellableQuantity: variantInfo.sellableQuantity,
      size: variantInfo.size,
      color: variantInfo.color,
      material: variantInfo.material,
      unit: variantInfo.unit,
      originalPrice: variantInfo.originalPrice,
      wholeSalePrice: variantInfo.wholeSalePrice,
      retailPrice: variantInfo.retailPrice,
      sellableStatus: variantInfo.sellableQuantity,
    })
    ProductAPI.updateVariant(variantInfo.id,{
      variantCode: variantInfo.code,
      inventoryQuantity: variantInfo.inventoryQuantity,
      sellableQuantity: variantInfo.sellableQuantity,
      size: variantInfo.size,
      color: variantInfo.color,
      material: variantInfo.material,
      unit: variantInfo.unit,
      originalPrice: variantInfo.originalPrice,
      wholeSalePrice: variantInfo.wholeSalePrice,
      retailPrice: variantInfo.retailPrice,
      sellableStatus: variantInfo.sellableQuantity,
    })
      .then((res) => {
        setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã chỉnh sửa phiên bản sản phẩm" });
        triggerReload();
        setViewState(1);
      })
      .catch(err => {
        // setStateAlert({ severity: "error", variant: "filled", open: true, content: err.respond.data })
        console.log(err.respond.data);
      });
  }
  return (
    <React.Fragment>
      <Box
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography variant="subtitle1" id="tableTitle" px={1}>
          Thông tin phiên bản
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" px={1} py={2}>
          <Box
            width="66.66667%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Grid container>
              <Typography variant="body2">Mã SKU</Typography>
              <TextField
                fullWidth
                size="small"
                name="code"
                placeholder="Nhập mã SKU phiên bản"
                onChange={handleChange}
                value={variantInfo.code}
              />
            </Grid>
            <Box>
              <Typography variant="body2">Đơn vị tính</Typography>
              <TextField
                fullWidth
                size="small"
                name="unit"
                placeholder="Nhập đơn vị tính"
                onChange={handleChange}
                value={variantInfo.unit}
              />
            </Box>
            <Box>
              <Typography variant="body2">Màu sắc</Typography>
              <TextField
                fullWidth
                size="small"
                name="color"
                placeholder="Nhập màu"
                onChange={handleChange}
                value={variantInfo.color}
              />
            </Box>
            <Box>
              <Typography variant="body2">Chất liệu</Typography>
              <TextField
                fullWidth
                size="small"
                name="material"
                placeholder="Nhập chất liệu"
                onChange={handleChange}
                value={variantInfo.material}
              />
            </Box>
            <Box>
              <Typography variant="body2">Kích thước</Typography>
              <TextField
                fullWidth
                size="small"
                name="size"
                placeholder="Nhập kích thước"
                onChange={handleChange}
                value={variantInfo.size}
              />
            </Box>
          </Box>
          <Box width="33.3333%" textAlign="center">
            <Box
              width="100%"
              heigh="273px"
              sx={{ border: 1, display: "inline-block" }}
            ></Box>
            <Button>Thêm ảnh</Button>
          </Box>
        </Box>
      </Box>
      <Box
        mt={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Giá sản phẩm
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={1}
          py={2}
        >
        <Box>
          <Typography variant="body2">Giá bán lẻ</Typography>
          <TextField
            fullWidth
            size="small"
            name="retailPrice"
            placeholder="Nhập giá bán lẻ"
            onChange={handleChange}
            value={variantInfo.retailPrice}
          />
        </Box>
          <Box>
            <Typography variant="body2">Giá bán buôn</Typography>
            <TextField
              fullWidth
              size="small"
              name="wholeSalePrice"
              placeholder="Nhập giá bán buôn"
              onChange={handleChange}
              value={variantInfo.wholeSalePrice}
            />
          </Box>
          <Box>
            <Typography variant="body2">Giá nhập</Typography>
            <TextField
              fullWidth
              size="small"
              name="originalPrice"
              placeholder="Nhập giá nhập"
              onChange={handleChange}
              value={variantInfo.originalPrice}
            />
          </Box>
        </Box>
      </Box>
      <Box
        mt={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Khởi tạo kho hàng
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={1}
          py={2}
        >
          <Box>
            <Typography variant="body2">Số lượng trong kho</Typography>
            <TextField
              fullWidth
              size="small"
              name="inventoryQuantity"
              placeholder="Nhập số lượng kho khởi tạo"
              onChange={handleChange}
              value={variantInfo.inventoryQuantity}
            />
          </Box>
          <Box>
            <Typography variant="body2">Số lượng có thể bán</Typography>
            <TextField
              fullWidth
              size="small"
              name="sellableQuantity"
              placeholder="Nhập số lượng có thể bán"
              onChange={handleChange}
              value={variantInfo.sellableQuantity}
            />
          </Box>
        </Box>
      </Box>
      <Box
        mt={3}
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Typography
          // sx={{ flex: "1 1 100%" }}
          variant="subtitle1"
          id="tableTitle"
          px={1}
        >
          Trạng thái
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          px={1}
          py={2}
        >
          <Box>
            <Typography variant="body2">Cho phép bán</Typography>
            <Switch
              inputProps={{ "aria-label": "Trạng thái" }}
              checked={variantInfo.sellableStatus === "Có thể bán" ? true : false}
              size="small"
              onChange={handleChangeSellableStatus}
            />
          </Box>
        </Box>
      </Box>
      <Box my={3} px={1} display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={cancelAction}>
          Hủy
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdateVariant()}
        >
          Xác nhận chỉnh sửa
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default EditVariant;
