import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../service/user.service';
import { customerApi } from '../service/customer.service';
import { productApi } from '../service/product.service';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, customerApi.middleware ,productApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;