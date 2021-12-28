import React, {useState} from "react";
import { Box, Typography, Button, Divider, Checkbox, Grid } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import VariantsTable from "./VariantsTable";

const variants = [
  {
    id: 1,
    name: "phien ban 1",
    SKU: "M01",
    salePrice: "100.000d",
    wholesalePrice: "90.000d",
    importPrice: "80.000d",
  },
  {
    id: 2,
    name: "phien ban 2",
    SKU: "M02",
    salePrice: "100.000d",
    wholesalePrice: "90.000d",
    importPrice: "80.000d",
  },
  {
    id: 3,
    name: "phien ban 3",
    SKU: "M03",
    salePrice: "100.000d",
    wholesalePrice: "90.000d",
    importPrice: "80.000d",
  },
];

function ProductDetails() {
  const history = useHistory()

  const [variantInfo, setVariantInfo] = useState();
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
            display: 'flex',
            '&:hover': {
              cursor: 'pointer',
            }
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
        <Typography variant="h4">
          Điện thoại Iphone 13 XS Pro Plus Max
        </Typography>
        <Box display="flex">
          <Button variant="outlined" color="error" sx={{ mr: 2 }}>
            Xóa
          </Button>
          <Button variant="contained" color="primary">
            Chỉnh sửa sản phẩm
          </Button>
        </Box>
      </Box>

        <Box
          py={2}
          px={1}
          display="flex"
          flexDirection="column"
          backgroundColor="white"
        >
        <Typography variant="subtitle1" id="tableTitle" px={1}>
          Chi tiết sản phẩm
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex">
          <Box
            width="30%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={2}
            py={2}
          >
            <img
              src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
              srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="anh"
              loading="lazy"
              px={2}
              py={2}
            />
          </Box>
          <Box width="70%" display="flex" px={2} py={2}>
            <Box
              width="25%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
            >
              <Typography>Loại sản phẩm</Typography>
              <Typography>Nhãn hiệu</Typography>
              <Typography>Số phiên bản</Typography>
            </Box>
            <Box
              width="25%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
            >
              <Typography>: Điện thoại</Typography>
              <Typography>: Nhãn hiệu</Typography>
              <Typography>: Số phiên bản</Typography>
            </Box>
            <Box
              width="25%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
            >
              <Typography>Ngày tạo</Typography>
              <Typography>Ngày cập nhật cuối</Typography>
              <Typography>Xem Mô tả</Typography>
            </Box>
            <Box
              width="25%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              height="100%"
            >
              <Typography>: 17/11/2021 09:42</Typography>
              <Typography>: 22/12/2021 11:16</Typography>
              {/* placeholder */}
              <Typography sx={{ opacity: "0" }}>.</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Typography variant="h4" sx={{ pt: 2 }}>
        Phiên bản sản phẩm
      </Typography>
      <Box pt={1} display="flex">
        <Box display="flex" width="33.3333%" mr={3}>
          <VariantsTable setVariantInfo={setVariantInfo} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="66.6667%"
          height="30px"
        >
          <Box
            py={2}
            px={1}
            display="flex"
            flexDirection="column"
            backgroundColor="white"
          >
            <Typography
              variant="subtitle1"
              id="tableTitle"
              px={1}
            >
              Thông tin chi tiết phiên bản                             {variantInfo}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1}  py={2}>
              <Box
                width="33.3333%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography variant="body2">Tên phiên bản sản phẩm</Typography>
                <Typography variant="body2">Mã SKU</Typography>
                <Typography variant="body2">Đơn vị tính</Typography>
                <Typography variant="body2">Khối lượng</Typography>
                <Typography variant="body2">Màu sắc</Typography>
              </Box>
              <Box
                width="33.3333%"
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
              >
                <Typography variant="body2">
                  : Áo khoác Chino thời thượng SID56708 - Trắng
                </Typography>
                <Typography variant="body2">: PVN05</Typography>
                <Typography variant="body2">: SID56708</Typography>
                <Typography variant="body2">: 1KG</Typography>
                <Typography variant="body2">: Trắng</Typography>
              </Box>
              <Box width="33.3333%" textAlign="center">
                <Box
                  component="img"
                  src="https://sapo.dktcdn.net/100/583/900/variants/3b602191-ec13-43ff-a785-76ecffaff3be.jpg"
                  height="150px"
                  width="129px"
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
              Giá sản phẩm
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" flexDirection="column" px={1} py={2}>
              <Grid container>
                <Grid item xs={2}><Typography variant="body2">Giá bán buôn</Typography></Grid>
                <Grid item xs={4}><Typography variant="body2">: 200.000</Typography></Grid>
                <Grid item xs={2}><Typography variant="body2">Giá bán lẻ</Typography></Grid>
                <Grid item xs={4}><Typography variant="body2">: 150.000</Typography></Grid>
              </Grid>
              <Divider sx={{my: 1}} />
              <Grid container>
                <Grid item xs={2}><Typography variant="body2">Giá nhập</Typography></Grid>
                <Grid item xs={4}><Typography variant="body2">: 100.000</Typography></Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetails;
