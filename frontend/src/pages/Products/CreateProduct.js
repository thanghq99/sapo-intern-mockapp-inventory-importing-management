import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Checkbox,
  Grid,
  FormControl,
  InputLabel,
  TextField,
  Tooltip,
  Switch,
  Select,
  MenuItem,
} from "@mui/material";
import { ArrowBackIosNew, Info, Add } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import "./createProduct.scss";

function CreateProduct() {
  const history = useHistory();
  const longText =
    "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu.";
  const [category, setCategory] = React.useState();
  const [brand, setBrand] = React.useState();

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
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
          onClick={() => history.push("/san-pham")}
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
          <Button variant="outlined" sx={{ mr: 2 }}>
            Thoát
          </Button>
          <Button variant="contained" color="primary">
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
                  <TextField fullWidth placeholder="Nhập tên sản phẩm" />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Mã sản phẩm/SKU
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField fullWidth placeholder="Nhập mã sản phẩm" />
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
                  <TextField fullWidth placeholder="Nhập khối lượng" />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Box display="flex">
                    <Typography variant="subtitle1" id="tableTitle">
                      Đơn vị tính
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField fullWidth placeholder="Nhập đơn vị tính" />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontWeight: "400",
                      fontSize: "1rem",
                    }}
                  >
                    Mô tả sản phẩm
                  </Button>
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
                  <TextField fullWidth placeholder="Nhập giá bán buôn" />
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
                  <TextField fullWidth placeholder="Nhập giá bán buôn" />
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
                  <TextField fullWidth placeholder="Nhập giá nhập" />
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
                    value={category}
                    onChange={handleChangeCategory}
                    fullWidth
                    displayEmpty={true}
                    renderValue={
                      category !== "" ? undefined : () => "placeholder text"
                    }
                  >
                    <MenuItem value="Áo">Áo</MenuItem>
                    <MenuItem value="Quần">Quần</MenuItem>
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
                  <Select value={brand} onChange={handleChangeBrand} fullWidth>
                    <MenuItem value={10}>Adidas</MenuItem>
                    <MenuItem value={20}>Nike</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex">
                    <Typography
                      variant="subtitle1"
                      id="tableTitle"
                      sx={{ fontWeight: "500" }}
                    >
                      Tags
                    </Typography>
                    <Tooltip arrow title={longText}>
                      <Info fontSize="small" color="primary" />
                    </Tooltip>
                  </Box>
                  <TextField fullWidth multiline rows={3} />
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
                      defaultChecked
                      size="small"
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
