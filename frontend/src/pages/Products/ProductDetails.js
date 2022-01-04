import React, { useState, useEffect } from "react";
import ProductAPI from "../../api/ProductAPI";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import { ArrowBackIosNew, HistorySharp } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import VariantsTable from "./VariantsTable";
import VariantDetails from "./VariantDetails";

function ProductDetails() {
  const history = useHistory();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variantInfo, setVariantInfo] = useState({
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
    sellableStatus: "---",
  });
  async function getData() {
    const productData = await ProductAPI.product(params.id);
    setProduct(productData.data);
    const variantsData = await ProductAPI.variantList(params.id);
    setVariants(variantsData.data);
    console.log(variantsData);
    setLoading(false);
  }

  useEffect(() => {
    getData();
    return () => {
      setLoading(true);
    };
  }, []);

  const handleDeleteProduct = () => {
    ProductAPI.deleteProduct(product.id);
    alert(product.name + " has been deleted!");
    history.push(`/san-pham`);
  }

  return !loading ? (
    <Box
      px={4}
      backgroundColor="#F4F6F8"
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
          <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={() => handleDeleteProduct()}>
            Xóa
          </Button>
          <Button variant="contained" color="primary" onClick={() => history.push(`/san-pham/${product.id}/chinh-sua`)}>
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
      <Box pt={1} pb={2} display="flex">
        <Box width="33.3333%" mr={3}>
          <VariantsTable setVariantInfo={setVariantInfo} variants={variants} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="66.6667%"
        >
          <VariantDetails variantInfo={variantInfo}/>
        </Box>
      </Box>
    </Box>
  ) : (
    <div>loading</div>
  );
}

export default ProductDetails;
