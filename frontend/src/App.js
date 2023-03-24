import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import History from "./pages/History";
import { Info } from "./modules/Info";

import Barter from "./types/Barter";
import Contribution from './types/Contribution';
import Debt from './types/Debt';
import Offline from './types/Offline';
import Online from './types/Online';



function App() {
  const activation = ({isActive}) =>{
    return isActive ? 'active-nav' : ''
  }
  return(
      <Router >
        <Info />
        <header>
          <h1 className="logo">Lab1</h1>
          <nav>
            <NavLink to="/" className={activation} >Клиенты</NavLink>
            <NavLink to="/products" className={activation} >Товары</NavLink>
            <NavLink to="/orders" className={activation} >Заказы</NavLink>
            <NavLink to="/history" className={activation} >История</NavLink>
          </nav>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Clients />}></Route>
            <Route path="products" element={<Products />}></Route>
              <Route path="history" element={<History />}></Route>
              <Route path="orders" element={<Orders />}>
                <Route path="online" element={<Online />}></Route>
                <Route path="offline" element={<Offline />}></Route>
                <Route path="debt" element={<Debt />}></Route>
                <Route path="contribution" element={<Contribution />}></Route>
                <Route path="barter" element={<Barter />}></Route>
              </Route>
          </Routes>
        </div>
      </Router>
    ) 
  
}

export default App;
