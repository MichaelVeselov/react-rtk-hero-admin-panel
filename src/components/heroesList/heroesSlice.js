import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
});

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
  const { request } = useHttp();
  return request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroCreated: (state, action) => {
      const { payload } = action;
      heroesAdapter.addOne(state, payload);
    },
    heroDeleted: (state, action) => {
      const { payload } = action;
      heroesAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        const { payload } = action;
        heroesAdapter.setAll(state, payload);
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

const selectAllHeroes = heroesAdapter.getSelectors(
  (state) => state.heroes
).selectAll;

export const filteredHeroesSelector = createSelector(
  selectAllHeroes,
  (state) => state.filters.activeFilter,
  (heroes, filter) => {
    if (filter === 'all') {
      return heroes;
    } else {
      return heroes.filter((item) => item.element === filter);
    }
  }
);

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted,
} = actions;
