import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import CustomerList from "../pages/customers/CustomerList";
import ProductList from "../pages/products/ProductList";
import OrderList from "../pages/orders/OrderList";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Inbox from "../pages/communication/Inbox";
import Invoice from "../pages/business/Invoice";
import Todo from "../pages/calendar/Todo";
import Calender from "../pages/calendar/Calender";
import UserList from "../pages/user/User";
import Pricing from "../pages/business/Pricing";
import AddProduct from "../pages/products/AddProduct";
import AddCustomer from "../pages/customers/AddCustomer";
import AddOrder from "../pages/orders/AddOrder";
import AddUser from "../pages/user/AddUser";
import UpdateUser from "../pages/user/UpdateUser";
import UpdateCustomer from "../pages/customers/UpdateCustomer";
import UpdateProduct from "../pages/products/UpdateProduct";


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
      { path: "pricing", Component: Pricing },
      { path: "add-product", Component: AddProduct },
      { path: "add-customer", Component: AddCustomer },
      { path: "add-order", Component: AddOrder },
      { path: "add-user", Component: AddUser },
      { path: "update-user/:id", Component: UpdateUser },
      { path: "update-customer/:id", Component: UpdateCustomer },
      { path: "update-product/:id", Component: UpdateProduct },
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
