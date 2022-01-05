import "./app.scss";
import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, CssBaseline } from '@mui/material';
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

function App() {
  const [headerTitle, setHeaderTitle] = useState('');
  const { token } = useContext(AuthContext);

  const pathRoute = [
    {
      path: "/san-pham",
      component: <Products />
    },
    {
      path: "/san-pham/tao-san-pham",
      component: <CreateProduct />
    },
    {
      path: "san-pham/san-pham-x",
      component: <ProductDetails />
    },
    {
      path: "/kho-hang",
      component: null
    },
    {
      path: "/kiem-hang",
      component: null
    },
    {
      path: "/nha-cung-cap",
      component: <Supplier />
    },
    {
      path: "/nha-cung-cap/tao-moi-nha-cung-cap",
      component: <CreateSupplier />
    },
    {
      path: "/thong-tin-nha-cung-cap",
      component: <DetailSupplier />
    },
    {
      path: "/nhap-hang",
      component: <ListOrder />
    },
    {
      path: "/nhap-hang/tao-don-nhap-hang",
      component: <SupplyOrder />
    },
    {
      path: "/cai-dat",
      component: null
    },
  ];

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Router className="App1">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {/* {
            pathRoute.map((route) => (
              !token ?
                <Login />
                :
                <Box sx={{ display: "flex", width: "100%", background: "#27274b", }}>
                  <CssBaseline />
                  <Sidebar setHeaderTitle={setHeaderTitle} />
                  <Box className="box_content" component="main">
                    <Topbar headerTitle={headerTitle} />
                    <Route path={route.path} >
                      {route.component}
                    </Route>
                  </Box>
                </Box>
            ))
          } */}

          {!token ?
            <Login />
            :
            <Box sx={{ display: "flex", width: "100%", background: "#27274b", }}>
              <CssBaseline />
              <Sidebar setHeaderTitle={setHeaderTitle} />
              <Box className="box_content" component="main">
                <Topbar headerTitle={headerTitle} ></Topbar>
                <Route exact path="/san-pham" component={Products}></Route>
                <Route path="/san-pham/tao-san-pham" component={CreateProduct}></Route>
                <Route path="/san-pham/san-pham-x" component={ProductDetails}></Route>
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
              </Box>
            </Box>}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
