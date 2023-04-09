import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useHttp } from '../../hooks/http.hook';

import {
  heroDeleted,
  fetchHeroes,
  filteredHeroesSelector,
} from './heroesSlice';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
  const filteredHeroes = useSelector(filteredHeroesSelector);

  const heroesLoadingStatus = useSelector(
    (state) => state.heroes.heroesLoadingStatus
  );

  const dispatch = useDispatch();

  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(dispatch(heroDeleted(id)))
        .catch((error) => console.error(error));
    },
    [request]
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className='text-center mt-5'>Loading error...</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames='hero'>
          <h5 className='text-center mt-5'>
            There are no heroes in the list...
          </h5>
        </CSSTransition>
      );
    }

    return arr.map((item) => {
      const { id, ...props } = item;
      return (
        <CSSTransition key={id} timeout={500} classNames='hero'>
          <HeroesListItem onDelete={() => onDelete(id)} {...props} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  return <TransitionGroup component='ul'>{elements}</TransitionGroup>;
};

export default HeroesList;
