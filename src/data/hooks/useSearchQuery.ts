import { useCallback } from 'react';
import { useSelector, useStore } from 'react-redux';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { injectLazyReducer, useAppDispatch } from '../store';

type PartialStoreState = {
  searchQuery: string;
};

/**
 *
 *
 */

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: '',
  reducers: {
    setText: (_, { payload }: PayloadAction<string>) => {
      console.log('re', payload);
      return payload;
    },
  },
});

/**
 *
 *
 *
 */

const useSearchQuery = () => {
  const store = useStore();
  const dispatch = useAppDispatch();
  injectLazyReducer(store, {
    key: searchQuerySlice.name,
    reducer: searchQuerySlice.reducer,
  });

  const queryText = useSelector(
    (state: PartialStoreState) => state.searchQuery
  );

  const setQueryText = useCallback(
    (text: string) => {
      dispatch(searchQuerySlice.actions.setText(text));
    },
    [dispatch]
  );

  return {
    queryText,
    setQueryText,
  };
};

export default useSearchQuery;
