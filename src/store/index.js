import { configureStore } from '@reduxjs/toolkit';

import heroesReducer from '../components/heroesList/heroesSlice';
import filtersReducer from '../components/heroesFilters/filtersSlice';

const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production' ? true : false,
});

export default store;
