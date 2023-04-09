import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classNames';

import {
  activeFilterChanged,
  fetchFilters,
  selectAllFilters,
} from './filtersSlice';

import store from '../../store';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const filters = selectAllFilters(store.getState());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Loading error...</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Filters not found...</h5>;
    }

    return arr.map((item) => {
      const { name, className, label } = item;

      const btnClass = classNames('btn', className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Filter the characters by element</p>
        <div className='btn-group'>{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
