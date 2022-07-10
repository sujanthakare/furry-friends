import { useDispatch } from 'react-redux';

import {
  Reducer,
  Store,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import kittyApi from './kitty-api';

const combineAppReducer = (lazyReducers: Record<string, Reducer<any>>) => {
  const defaultReducers = {
    [kittyApi.reducerPath]: kittyApi.reducer,
  };

  return combineReducers({
    ...defaultReducers,
    ...lazyReducers,
  });
};

export const injectLazyReducer = (
  currentStore: Store & { lazyReducers?: Record<string, Reducer<any>> },
  reducerMap: {
    key: string;
    reducer: Reducer<any>;
  }
) => {
  if (!currentStore.lazyReducers) {
    currentStore.lazyReducers = {};
  }

  if (currentStore.lazyReducers[reducerMap.key]) {
    return;
  }
  currentStore.lazyReducers[reducerMap.key] = reducerMap.reducer;
  currentStore.replaceReducer(combineAppReducer(currentStore.lazyReducers));
};

const store = configureStore({
  reducer: combineAppReducer({}),
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kittyApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
