import "./app.scss"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from "./components/sidebar/Sidebar";
import Products from './pages/Products/Products';
import Test from "./pages/Test";


function App() {
  return (
    <div className="App">
      <Router className="App1">
        <Sidebar />
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
