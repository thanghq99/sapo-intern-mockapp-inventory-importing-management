import React, { useState, useEffect } from "react";
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
import ProductDetailsInfo from "../../components/product/productDetails/productDetailsInfo"


Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function ProductDetails({setStateAlert}) {
  const history = useHistory();
  const params = useParams();
  const {chosenVariant} = useLocation();
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
        <ProductDetailsInfo product={product} variantNumber={variants.length}/>
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
