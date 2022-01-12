import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Divider, Grid, TextField, Switch, Chip } from "@mui/material";
import { ArrowBackIosNew, Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import "./createProduct.scss";
import CategoryAPI from "../../api/CategoryAPI";
import ProductAPI from "../../api/ProductAPI";
import CategorySelect from "../../components/product/category/CategorySelect";

function CreateProduct({ setStateAlert }) {
  const history = useHistory();
  const colorRef = useRef(null);
  const materialRef = useRef(null);
  const sizeRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState(['vang', 'do', 'xanh']);
  const [materials, setMaterials] = useState(['vai', 'giay']);
  const [sizes, setSizes] = useState(['L', 'XL']);
  const [product, setProduct] = useState({
    variantCode: "",
    inventoryQuantity: 0,
    sellableQuantity: 0,
    size: [],
    color: [],
    material: [],
    unit: "",
    originalPrice: 0,
    wholeSalePrice: 0,
    retailPrice: 0,
    //khi khởi tạo măc định true?
    recordStatus: true,
    sellableStatus: true,
    productName: "",
    categoryId: "",
    weight: 0,
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

  //PROPERTIES
  const handleKeyDown = (evt, array, setArray, ref) => {
    if(evt.keyCode == 13 && evt.target.value) {
      let newArray = array;
      if (newArray.includes(evt.target.value)) {
        setStateAlert({
          severity: "warning",
          variant: "filled",
          open: true,
          content: "Giá trị bị trùng",
        });
      } else {
        newArray.push(evt.target.value);
      }
      setArray([...newArray]);
      ref.current.value = ""
    }
   };

   function handleDeleteChip(item, array, setArray) {
      let newArray = array;
      newArray = newArray.filter(chip => chip !== item);
      setArray([...newArray]);
   }

  function updateProductProperties() {
    setProduct({
      ...product,
      color: [...colors],
      material: [...materials],
      size: [...sizes]
    });
  }

  //category
  const handleSelectCategory = (categoryId) => {
    setProduct({ ...product, categoryId: categoryId });
  };

  //status
  const handleChangeSellableStatus = (evt) => {
    const value = evt.target.checked;
    setProduct({
      ...product,
      ["sellableStatus"]: value,
    });
  };

  //actions
  const cancelAction = () => {
    setStateAlert({
      severity: "warning",
      variant: "filled",
      open: true,
      content: "Đã hủy tạo thêm phiên bản sản phẩm",
    });
    history.push("/san-pham");
  };

  const handleCreateProduct = () => {
    updateProductProperties();
    console.log(product);
    ProductAPI.createProduct(product)
      .then((res) => {
        setStateAlert({
          severity: "success",
          variant: "filled",
          open: true,
          content: "Đã tạo thêm sản phẩm",
        });
        history.push("/san-pham");
      })
      .catch((err) => {
        setStateAlert({
          severity: "error",
          variant: "filled",
          open: true,
          content: "Có lỗi xảy ra khi tạo thêm sản phẩm",
        });
      });
  };

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
                  </Box>
                  <TextField
                    fullWidth
                    name="productName"
                    placeholder="Nhập tên sản phẩm"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Khối lượng
                    </Typography>
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
                  </Box>
                  <TextField
                    fullWidth
                    name="colors"
                    placeholder="Nhập màu sắc"
                    inputRef={colorRef}
                    // onChange={handleChange}
                    onKeyDown={(evt) => handleKeyDown(evt, colors, setColors, colorRef)}
                    InputProps={{
                      startAdornment: colors.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          onDelete={() => handleDeleteChip(item, colors, setColors)}
                        />
                      )),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Chất liệu
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="materials"
                    placeholder="Nhập chất liệu"
                    inputRef={materialRef}
                    // onChange={handleChange}
                    onKeyDown={(evt) => handleKeyDown(evt, materials, setMaterials, materialRef)}
                    InputProps={{
                      startAdornment: materials.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          onDelete={() => handleDeleteChip(item, materials, setMaterials)}
                        />
                      )),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Kích thước
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    name="materials"
                    placeholder="Nhập kích thước"
                    inputRef={sizeRef}
                    // onChange={handleChange}
                    onKeyDown={(evt) => handleKeyDown(evt, sizes, setSizes, sizeRef)}
                    InputProps={{
                      startAdornment: sizes.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          onDelete={() => handleDeleteChip(item, sizes, setSizes)}
                        />
                      )),
                    }}
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
                  </Box>
                  <CategorySelect handleSelectCategory={handleSelectCategory} />
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
                  </Box>
                  <TextField
                    fullWidth
                    name="brand"
                    placeholder="Nhập nhãn hiệu"
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
                      Mô tả sản phẩm
                    </Typography>
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
