import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import UpdateUser from "./pages/updateUser/UpdateUser";
// import Order from "./pages/order/Order";
import OrderId from "./pages/orderId/OrderId";
import Orders from "./pages/Orders/Orders";

function App() {
  const [ifAdmin, setIfAdmin] = useState("");
  const { user } = useSelector((state) => state.auth);

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {user ? (
              <Route
                index
                element={user.isAdmin === true ? <Home /> : <Login />}
              />
            ) : (
              <Route index element={<Login />} />
            )}
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
              <Route
                path="edit/:id"
                element={<UpdateUser title="Edit User" />}
              />
            </Route>
            <Route path="orders" element={<Orders />} />
            <Route path="status-order/:orderId" element={<OrderId />} />
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
