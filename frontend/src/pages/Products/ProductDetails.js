import React, { useState, useEffect } from "react";
import ProductAPI from "../../api/ProductAPI";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import VariantsTable from "./VariantsTable";

function ProductDetails() {
  const history = useHistory();
  const params = useParams();
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variantInfo, setVariantInfo] = useState(
    {
      id: "---",
      code: "---",
      inventoryQuantity: "---",
      sellableQuantity: "---",
      size: "---",
      color: "---",
      material: "---",
      unit: "---",
      originalPrice: "---",
      wholeSalePrice: "---",
      retailPrice: "---",
      recordStatus: "---",
      sellableStatus: "---"
    }
  );
  async function getData() {
    const result = await ProductAPI.product(params.id);
    setProduct(result.data);
    setVariants(result.data.variants);
    setLoading(false);
  }
  useEffect(() => {
    getData();
    return () => {
      setLoading(true);
    }
  }, []);
  return (
    !loading ?
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
        <Typography variant="h4">{product.name}</Typography>
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
              <Typography>: {product.category.name}</Typography>
              <Typography>: {product.brand}</Typography>
              <Typography>: {variants.length}</Typography>
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
              <Typography>: {product.createdAt}</Typography>
              <Typography>: {product.updatedAt}</Typography>
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
          <VariantsTable setVariantInfo={setVariantInfo} variants={variants} />
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
            <Typography variant="subtitle1" id="tableTitle" px={1}>
              Thông tin chi tiết phiên bản
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" px={1} py={2}>
              <Box
                width="33.3333%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography variant="body2">Mã SKU</Typography>
                <Typography variant="body2">Đơn vị tính</Typography>
                <Typography variant="body2">Kích thước</Typography>
                <Typography variant="body2">Chất liệu</Typography>
                <Typography variant="body2">Màu sắc</Typography>
              </Box>
              <Box
                width="33.3333%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography variant="body2">: {variantInfo.code}</Typography>
                <Typography variant="body2">: {variantInfo.unit}</Typography>
                <Typography variant="body2">: {variantInfo.size}</Typography>
                <Typography variant="body2">: {variantInfo.material}</Typography>
                <Typography variant="body2">: {variantInfo.color}</Typography>
              </Box>
              <Box width="33.3333%" textAlign="center">
                <Box
                  component="img"
                  src="https://sapo.dktcdn.net/100/583/900/variants/3b602191-ec13-43ff-a785-76ecffaff3be.jpg"
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
                <Grid item xs={2}>
                  <Typography variant="body2">Giá bán buôn</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">: {variantInfo.wholeSalePrice.toLocaleString('de-DE')}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">Giá bán lẻ</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">: {variantInfo.retailPrice.toLocaleString('de-DE')}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1 }} />
              <Grid container>
                <Grid item xs={2}>
                  <Typography variant="body2">Giá nhập</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">: {variantInfo.originalPrice.toLocaleString('de-DE')}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    :
    <div>loading</div>
  );
}

export default ProductDetails;
