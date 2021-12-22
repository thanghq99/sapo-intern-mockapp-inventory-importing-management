import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Box, CssBaseline} from '@mui/material';
import Sidebar from "./components/sidebar/Sidebar";
import Products from "./pages/Products/Products";
import SupplyOrder from "./pages/SupplyOrder/SupplyOrder";
import Supply from "./pages/Supply/Supply";
import Topbar from "./components/topbar/Topbar";

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Router className="App1">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            background: "#27274b",
          }}
        >
          <CssBaseline />
          <Sidebar />
          <Box className="box_content" component="main">
            <Topbar></Topbar>
            <Switch>
              <Route path="/san-pham">
                <Products />
              </Route>
              <Route path="/kho-hang"></Route>
              <Route path="/kiem-hang"></Route>
              <Route exact path="/nha-cung-cap" component={Supply} />
              <Route exact path="/nhap-hang" component={SupplyOrder} />
              <Route path="/cai-dat"></Route>
            </Switch>
          </Box>
        </Box>
      </Router>
    </div>
  );
}

export default App;
