import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/user.service';
import { customerApi } from '../services/customer.service';
import { productApi } from '../services/product.service';
import { categoryApi } from '../services/category.service';
import { tagApi } from '../services/tag.service';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      customerApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      tagApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;