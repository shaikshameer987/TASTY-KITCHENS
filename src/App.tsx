import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RestaurantInfo from "./pages/RestaurantInfo";
import Cart from "./pages/Cart";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurants/:id" element={<RestaurantInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
