import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "@/services/customer/customer.slice";
import productReducer from "@/services/product/product.slice";
import userReducer from "@/services/user/user.slice";

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    products: productReducer,
    users: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
