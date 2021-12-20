import "./app.scss"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from "./components/sidebar/Sidebar";
import Products from './pages/Products/Products';


function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Router className="App1">
        <Sidebar />
        <Switch>
          <Route path="/san-pham">
            <Products />
          </Route>
          <Route path="/kho-hang"></Route>
          <Route path="/kiem-hang"></Route>
          <Route path="/nhap-hang"></Route>
          <Route path="/cai-dat"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;