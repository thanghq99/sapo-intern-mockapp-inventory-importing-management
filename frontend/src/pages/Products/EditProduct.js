import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Divider, Grid, TextField, Tooltip, Select, MenuItem } from "@mui/material";
import { ArrowBackIosNew, Info, Add} from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import "./createProduct.scss";
import CategoryAPI from "../../api/CategoryAPI";
import ProductAPI from "../../api/ProductAPI";

function EditProduct({setStateAlert}) {
  const history = useHistory();
  const params = useParams();
  const longText =
    "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu.";
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [brands, setBrands] = useState([
    { label: "Adidas", id: 1 },
    { label: "Nike", id: 2 },
    { label: "Puma", id: 3 },
  ]);
  const [product, setProduct] = useState({});

  async function getData() {
    const result = await ProductAPI.product(params.id);
    setProduct(result.data);
    console.log(result.data);
    setCategoryId(result.data.category.id);
    const categoriesData = await CategoryAPI.CategoryList();
    setCategories(categoriesData.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
    
    return () => {
      setLoading(true);
    };
  }, []);

  const cancelAction = () => {
    setStateAlert({ severity: "warning", variant: "filled", open: true, content: "Đã hủy tạo thêm phiên bản sản phẩm" });
    history.push("/san-pham");
  }

  const handleEditProduct = () => {
    let updateProduct = {
        //nhung gia tri nay khong can update
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
        //update duy nhat 6 gia tri ben duoi
        productName: product.name,
        categoryId: categoryId,
        weight: product.weight,
        brand: product.brand,
        description: product.description,
        imageUrl: product.imageUrl,
      }
    console.log("it will update these data: ");
    console.log(updateProduct);
    ProductAPI.updateProduct(params.id, updateProduct)
    .then((res) => {
      setStateAlert({ severity: "success", variant: "filled", open: true, content: "Đã chỉnh sửa sản phẩm" });
      history.go(-1);
    })
    .catch(err => {
      setStateAlert({ severity: "error", variant: "filled", open: true, content: "Có lỗi xảy ra khi chỉnh sửa sản phẩm" });
      history.go(-1);
    });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setProduct({
      ...product,
      [evt.target.name]: value,
    });
  }

  const handleChangeCategory = (evt) => {
    const value = evt.target.value;
    setCategoryId(value);
  };

  const handleChangeBrand = (evt) => {
    const value = evt.target.value;
    setProduct({
      ...product,
      ["brand"]: value,
    });
  };

  return !loading ? (
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
          onClick={() => history.push("/san-pham")}
          sx={{
            display: "flex",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <ArrowBackIosNew sx={{ mr: 2 }}  onClick={cancelAction}/>
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
        <Typography variant="h4">Chỉnh sửa thông tin sản phẩm</Typography>
        <Box display="flex">
          <Button variant="outlined" sx={{ mr: 2 }} onClick={cancelAction}>
            Thoát
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {handleEditProduct()}}
          >
            Lưu thông tin
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
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                    onChange={handleChange}
                    value={product.name}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    value={product.weight}
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
                    id="category-select"
                    onChange={handleChangeCategory}
                    fullWidth
                    value={categoryId}
                    displayEmpty={true}
                    renderValue={
                      product.brand !== "" ? undefined : () => "Chọn nhãn hiệu"
                    }
                  >
                    {categories.map((category, index) => {
                      return (
                        <MenuItem key={index} value={category.id}>
                          {category.name}
                        </MenuItem>
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
                    id="brand-select"
                    value={product.brand}
                    onChange={handleChangeBrand}
                    fullWidth
                    displayEmpty={true}
                    renderValue={
                      product.brand !== "" ? undefined : () => "Chọn nhãn hiệu"
                    }
                  >
                    {brands.map((brand, index) => {
                      return (
                        <MenuItem key={index} value={brand.label}>
                          {brand.label}
                        </MenuItem>
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
                    value={product.description}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <div>loading</div>
  );
}

export default EditProduct;
