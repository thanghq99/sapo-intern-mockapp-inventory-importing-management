import React from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";

function VariantDetails({ variantInfo, setViewState }) {
  const showEditForm = () => {
    setViewState(3);
  }
  return (
    (variantInfo && <React.Fragment>
      <Box
        py={2}
        px={1}
        display="flex"
        flexDirection="column"
        backgroundColor="white"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" id="tableTitle" px={1}>
          Thông tin chi tiết phiên bản
        </Typography>
        <Button variant="contained" color="primary" onClick={() => {showEditForm()}}>Chỉnh sửa phiển bản</Button>
        </Box>
        
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
              <Typography variant="body2">
                : {variantInfo.wholeSalePrice.toLocaleString("de-DE")}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">Giá bán lẻ</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                : {variantInfo.retailPrice.toLocaleString("de-DE")}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="body2">Giá nhập</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                : {variantInfo.originalPrice.toLocaleString("de-DE")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  ));
}

export default VariantDetails;
