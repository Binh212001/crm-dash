import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import CustomerList from "../pages/customers/CustomerList";
import ProductList from "../pages/products/ProductList";
import OrderList from "../pages/orders/OrderList";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Inbox from "../pages/communication/Inbox";
import Calender from "../pages/calendar/Calender";
import Todo from "../pages/calendar/Todo";
import Invoice from "../pages/business/Invoice";
import OrderLists from "../pages/business/OrderLists";
import Pricing from "../pages/business/Pricing";
import AddProduct from "../pages/products/AddProduct";
import UserList from "../pages/communication/User";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "customers", Component: CustomerList },
      { path: "products", Component: ProductList },
      { path: "orders", Component: OrderList },
      { path: "inbox", Component: Inbox },
      { path: "user", Component: UserList },
      { path: "calender", Component: Calender },
      { path: "todo", Component: Todo },
      { path: "invoice", Component: Invoice },
      { path: "order-lists", Component: OrderLists },
      { path: "pricing", Component: Pricing },
      { path: "add-product", Component: AddProduct },
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