import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
  Grid,
  Alert,
  TextField,
  Tooltip,
  Switch,
  Select,
  MenuItem,
} from "@mui/material";
import { ArrowBackIosNew, Info, Add} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import "./createProduct.scss";
import CategoryAPI from "../../api/CategoryAPI";
import ProductAPI from "../../api/ProductAPI";

function CreateProduct({setStateAlert}) {
  const history = useHistory();
  const longText =
    "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu.";

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([
    { label: "Adidas", id: 1 },
    { label: "Nike", id: 2 },
    { label: "Puma", id: 3 },
  ]);
  const [product, setProduct] = useState({
    variantCode: "",
    inventoryQuantity: "",
    sellableQuantity: "",
    size: "",
    color: "",
    material: "",
    unit: "",
    originalPrice: "",
    wholeSalePrice: "",
    retailPrice: "",
    //khi khởi tạo măc định true?
    recordStatus: true,
    sellableStatus: "",
    productName: "",
    categoryId: "",
    weight: "",
    brand: "",
    description: "",
    imageUrl: "fake url",
  });

  useEffect(() => {
    CategoryAPI.CategoryList().then((res) => {
      setCategories(res.data);
    });
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    setProduct({
      ...product,
      [evt.target.name]: value,
    });
  }

  const handleChangeCategory = (evt) => {
    const value = evt.target.value;
    setProduct({
      ...product,
      ["categoryId"]: value,
    });
  };

  const handleChangeBrand = (evt) => {
    const value = evt.target.value;
    setProduct({
      ...product,
      ["brand"]: value,
    });
  };

  const handleChangeSellableStatus = (evt) => {
    const value = evt.target.checked;
    setProduct({
      ...product,
      ["sellableStatus"]: value,
    });
  };
  
  const cancelAction = () => {
    setStateAlert({ severity: "warning", variant: "filled", open: true, content: "Đã hủy tạo thêm phiên bản sản phẩm" });
    history.push("/san-pham");
  }

  const handleCreateProduct = () => {
    ProductAPI.createProduct(product)
    .then((res) => {
      setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã tạo thêm sản phẩm" });
      history.push("/san-pham");
    })
    .catch(err => {
      setStateAlert({ severity: "error", variant: "filled", open: true, content: "Có lỗi xảy ra khi tạo thêm sản phẩm" });
      history.push("/san-pham");
    });
  }

  return (
    <Box
      px={4}
      backgroundColor="#F4F6F8"
      minHeight="90vh"
      display="flex"
      flexDirection="column"
    >
      <Box py={1}>
        <Typography
          underline="none"
          onClick={cancelAction}
          sx={{
            display: "flex",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <ArrowBackIosNew sx={{ mr: 2 }} />
          Quay lại Danh sách sản phẩm
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={1}
        pb={2}
      >
        <Typography variant="h4">Tạo mới sản phẩm</Typography>
        <Box display="flex">
          <Button variant="outlined" sx={{ mr: 2 }} onClick={cancelAction}>
            Thoát
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log(product);
              handleCreateProduct();
            }}
          >
            Lưu sản phẩm
          </Button>
        </Box>
      </Box>
      <Grid py={2} px={1} container spacing={3}>
        <Grid item xs={8}>
          <Box
            py={2}
            px={1}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Thông tin chung
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Tên sản phẩm
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="productName"
                    placeholder="Nhập tên sản phẩm"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Mã sản phẩm/SKU
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="variantCode"
                    placeholder="Nhập mã sản phẩm"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Khối lượng
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="weight"
                    placeholder="Nhập khối lượng"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Đơn vị tính
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="unit"
                    placeholder="Nhập đơn vị tính"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            py={2}
            px={1}
            mt={3}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Giá sản phẩm
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Giá bán lẻ
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="retailPrice"
                    placeholder="Nhập giá bán buôn"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Giá bán buôn
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="wholeSalePrice"
                    placeholder="Nhập giá bán buôn"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Giá nhập
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="originalPrice"
                    placeholder="Nhập giá nhập"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            py={2}
            px={1}
            mt={3}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Thông số phiên bản
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Màu sắc
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="color"
                    placeholder="Nhập màu sắc"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Chất liệu
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="material"
                    placeholder="Nhập chất liệu"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Kích thước
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="size"
                    placeholder="Nhập kích thước"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            py={2}
            px={1}
            mt={3}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Ảnh sản phẩm
            </Typography>
            <Box display="flex" px={1} py={2}>
              <Box
                className="file-upload"
                sx={{
                  display: "flex",
                  bgcolor: "background.paper",
                  borderColor: "text.primary",
                  borderStyle: "dashed",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "5rem",
                  border: 1,
                }}
              >
                <Add sx={{ mr: 2 }} />
                <Typography variant="body2">Kéo thả hoặc&nbsp;</Typography>
                <Typography
                  className="file-upload-btn"
                  variant="body2"
                  sx={{ color: "#0088FF" }}
                >
                  tải ảnh lên từ thiết bị
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            py={2}
            px={1}
            mt={3}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Khởi tạo kho hàng
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Số lượng trong kho
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="inventoryQuantity"
                    placeholder="Nhập số lượng trong kho"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Số lượng có thể bán
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="sellableQuantity"
                    placeholder="Nhập số lượng có thể bán"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            py={2}
            px={1}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography variant="h6" id="tableTitle" px={1}>
              Thông tin bổ sung
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                    >
                      Loại sản phẩm
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <Select
                    id='category-select'
                    value={product.categoryId}
                    onChange={handleChangeCategory}
                    fullWidth
                    displayEmpty={true}
                    renderValue={
                      product.categoryId !== ""
                        ? undefined
                        : () => "Chọn loại sản phẩm"
                    }
                  >
                    {categories.map((category, index) => {
                      return (
                        <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                      placeholder="Chọn nhãn hiệu"
                    >
                      Nhãn hiệu
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <Select
                    id='brand-select'
                    value={product.brand}
                    onChange={handleChangeBrand}
                    fullWidth
                    displayEmpty={true}
                    renderValue={
                      product.brand !== ""
                        ? undefined
                        : () => "Chọn nhãn hiệu"
                    }
                  >
                    {brands.map((brand, index) => {
                      return (
                        <MenuItem key={index} value={brand.label}>{brand.label}</MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                    >
                      Mô tả sản phẩm
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    name="description"
                    multiline
                    rows={3}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                    >
                      Trạng thái
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Cho phép bán</Typography>
                    <Switch
                      inputProps={{ "aria-label": "Trạng thái" }}
                      size="small"
                      onChange={handleChangeSellableStatus}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateProduct;
