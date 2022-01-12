import "./app.scss";
import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import Sidebar from "./components/sidebar/Sidebar";
import Products from "./pages/Products/Products";
import SupplyOrder from "./pages/SupplyOrder/NewOrder/SupplyOrder";
import CreateProduct from "./pages/Products/CreateProduct";
import ProductDetails from "./pages/Products/ProductDetails";
import Supplier from "./pages/Suppliers/Suppliers";
import Topbar from "./components/topbar/Topbar";
import CreateSupplier from "./pages/Suppliers/CreateSupplier";
import DetailSupplier from "./pages/Suppliers/DetailSupplier";
import ListOrder from "./pages/SupplyOrder/ListOrder/ListOrder";
import DetailOrder from "./pages/SupplyOrder/DetailOrder/DetailOrder";
import UpdateOrder from "./pages/SupplyOrder/UpdateOrder/UpdateOrder";
import Login from "./pages/Login_Register/Login";
import Register from "./pages/Login_Register/Register";
import { AuthContext } from "./contextAPI/AuthContext";
import EditProduct from "./pages/Products/EditProduct";

function App() {
  const [headerTitle, setHeaderTitle] = useState('');
  const { token } = useContext(AuthContext);
  const [stateAlert, setStateAlert] = useState({
    severity: "",
    variant: "",
    open: false,
    content: "",
  });

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Router className="App1">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {!token ?
            <Login />
            :
            <Box sx={{ display: "flex", width: "100%", background: "#27274b", }}>
              <CssBaseline />
              <Sidebar setHeaderTitle={setHeaderTitle} />
              <Box className="box_content" component="main">
                <Topbar headerTitle={headerTitle} ></Topbar>
                <Route exact path="/san-pham" component={Products}></Route>
                <Route path="/tao-san-pham">
                  <CreateProduct setStateAlert={setStateAlert} />
                </Route>
                <Route exact path="/san-pham/:id">
                  <ProductDetails setStateAlert={setStateAlert} />
                </Route>
                <Route path="/san-pham/:id/chinh-sua" >
                  <EditProduct setStateAlert={setStateAlert} />
                </Route>
                <Route path="/kho-hang"></Route>
                <Route path="/kiem-hang"></Route>
                <Route exact path="/nha-cung-cap" component={Supplier} />
                <Route path="/nha-cung-cap/tao-moi-nha-cung-cap" component={CreateSupplier}></Route>
                <Route path="/thong-tin-nha-cung-cap" component={DetailSupplier}></Route>
                <Route exact path="/nhap-hang" component={ListOrder} />
                <Route path="/nhap-hang/tao-don-nhap-hang" component={SupplyOrder}></Route>
                <Route path="/nhap-hang/don-hang" component={DetailOrder}></Route>
                <Route path="/nhap-hang/sua-don-hang" component={UpdateOrder}></Route>
                <Route path="/cai-dat"></Route>
                {stateAlert.severity && (
                  <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={stateAlert.open}
                    autoHideDuration={2000}
                    onClose={() => setStateAlert({ ...stateAlert, open: false })}
                  >
                    <Alert
                      onClose={() => setStateAlert({ ...stateAlert, open: false })}
                      severity={stateAlert.severity}
                      variant={stateAlert.variant}
                      sx={{ width: "100%" }}
                    >
                      {stateAlert.content}
                    </Alert>
                  </Snackbar>
                )}
              </Box>
            </Box>}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
