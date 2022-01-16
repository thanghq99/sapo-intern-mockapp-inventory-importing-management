import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import SwiperCore, { Pagination, Navigation } from "swiper";
// install Swiper modules


import ProductAPI from "../../api/ProductAPI";
import {
  Box,
  Typography,
  Button,
  Divider
} from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useHistory, useParams, useLocation } from "react-router-dom";
import VariantsTable from "./VariantsTable";
import VariantDetails from "./VariantDetails";
import CreateVariant from "./CreateVariant";
import EditVariant from "./EditVariant";
import DescriptionDialog from "../../components/product/productDetails/DescriptionDialog";
import "./products.scss"
import ProductDetailsInfo from "../../components/product/productDetails/productDetailsInfo"


Number.prototype.format = function (n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};



SwiperCore.use([Pagination, Navigation]);
function ProductDetails({ setStateAlert }) {

  const history = useHistory();
  const params = useParams();
  const { chosenVariant } = useLocation();
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [viewState, setViewState] = useState(1); // 1: view details, 2: create, 3: edit
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
    if (chosenVariant) {
      setVariantInfo(chosenVariant);
    } else {
      setVariantInfo(variantsData.data[0]);
    }
    // setVariantInfo(variantsData.data[0]);
    setLoading(false);
  }

  useEffect(() => {
    getData();
    return () => {
      setLoading(true);
    };
  }, [trigger]);

  const handleDeleteProduct = () => {
    ProductAPI.deleteProduct(product.id);
    alert(product.name + " has been deleted!");
    history.push(`/san-pham`);
  };

  const handleDeleteVariant = (id) => {
    ProductAPI.deleteVariant(id);
  };

  const triggerReload = () => {
    setTrigger(!trigger);
  };

  return !loading ? (
    <Box px={4} backgroundColor="#F4F6F8" display="flex" flexDirection="column">
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
          <Button
            variant="outlined"
            color="error"
            sx={{ mr: 2 }}
            onClick={() => handleDeleteProduct()}
          >
            Xóa
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/san-pham/${product.id}/chinh-sua`)}
          >
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
        {/* <ProductDetailsInfo product={product} variantNumber={variants.length}/> */}
        <Box display="flex">
          <Box

            width="25%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={2}
            py={2}
          >
            <Swiper
              navigation={true}
              pagination={{
                dynamicBullets: true
              }}
              className="mySwiper"
            >
              {
                variants.map((variant) => (
                  <SwiperSlide key={variant.code}><img src={variant.imageUrl} /></SwiperSlide>
                ))
              }
            </Swiper>
          </Box>
          <Box width="75%" display="flex" px={2} py={2}>
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
              <Typography>: {product.category}</Typography>
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
              <DescriptionDialog description={product.description} />
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
          <VariantsTable
            chosenOneVariant={variantInfo.code}
            setVariantInfo={setVariantInfo}
            variants={variants}
            setViewState={setViewState}
          />
        </Box>
        <Box display="flex" flexDirection="column" width="66.6667%">
          {(() => {
            switch (viewState) {
              case 1:
                return (
                  <VariantDetails
                    variantInfo={variantInfo}
                    setViewState={setViewState}
                  />
                );
              case 2:
                return (
                  <CreateVariant
                    triggerReload={triggerReload}
                    productId={product.id}
                    setViewState={setViewState}
                    setStateAlert={setStateAlert}
                  />
                );
              case 3:
                return (
                  <EditVariant
                    triggerReload={triggerReload}
                    productId={product.id}
                    setViewState={setViewState}
                    variantData={variantInfo}
                    setStateAlert={setStateAlert}
                  />
                );
            }
          })()}
        </Box>
      </Box>
    </Box>
  ) : (
    <div>loading</div>
  );
}

export default ProductDetails;
