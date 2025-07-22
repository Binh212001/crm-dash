import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Pricing from "../pages/business/Pricing";
import Calender from "../pages/calendar/Calender";
import Todo from "../pages/calendar/Todo";
import Inbox from "../pages/communication/Inbox";
import AddCustomer from "../pages/customers/AddCustomer";
import CustomerList from "../pages/customers/CustomerList";
import UpdateCustomer from "../pages/customers/UpdateCustomer";
import Dashboard from "../pages/dashboard/Dashboard";
import AddOrder from "../pages/orders/AddOrder";
import OrderDetail from "../pages/orders/OrderDetail";
import OrderList from "../pages/orders/OrderList";
import AddProduct from "../pages/products/AddProduct";
import ProductList from "../pages/products/ProductList";
import UpdateProduct from "../pages/products/UpdateProduct";
import AddUser from "../pages/user/AddUser";
import UpdateUser from "../pages/user/UpdateUser";
import UserList from "../pages/user/User";
import RoomChat from "@/pages/communication/RoomChat";
import Settings from "@/pages/system/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "customers", Component: CustomerList },
      { path: "products", Component: ProductList },
      { path: "orders", Component: OrderList },
      {
        path: "inbox",
        Component: Inbox,
        children: [
          {
            path: ":roomId",
            Component: RoomChat,
          },
        ],
      },
      { path: "user", Component: UserList },
      { path: "calender", Component: Calender },
      { path: "todo", Component: Todo },
      { path: "pricing", Component: Pricing },
      { path: "add-product", Component: AddProduct },
      { path: "add-customer", Component: AddCustomer },
      { path: "add-order", Component: AddOrder },
      { path: "add-user", Component: AddUser },
      { path: "update-user/:id", Component: UpdateUser },
      { path: "update-customer/:id", Component: UpdateCustomer },
      { path: "update-product/:id", Component: UpdateProduct },
      { path: "order/detail/:id", Component: OrderDetail },
      { path: "Settings", Component: Settings },
    ],
  },
  {
    path: "/auth",
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);
