import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  useEffect, createContext, useCallback, useRef,
} from 'react';
import { useImmerReducer } from 'use-immer';
import useWindowDimensions from '../utils/useWindowDimensions';
import useMoviesStore from '../store/MovieStore';

const initialState = {
  detailsVisibility: 'hidden',
  listVisibility: 'block',
  pageYOffset: 0,
  isClosed: true,
};

const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'showDetails':
      state.detailsVisibility = 'block';
      state.pageYOffset = window.pageYOffset;
      state.isClosed = false;
      if (action.displayMedia === 'mobile') {
        state.listVisibility = 'hidden';
      }
      break;
    case 'hideDetails':
      state.detailsVisibility = 'hidden';
      state.listVisibility = 'block';
      state.isClosed = true;
      break;
    case 'resize':
      console.log(state.isClosed);
      if (action.displayMedia === 'desktop' || state.isClosed) {
        state.listVisibility = 'block';
      } else if (action.displayMedia === 'mobile') {
        state.listVisibility = 'hidden';
      }
      break;
    default:
      throw new Error();
  }
};

export const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const { query } = useRouter();
  const setSelectedMovie = useMoviesStore((state) => state.setSelectedMovie);

  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const { detailsVisibility, listVisibility } = state;
  const { width } = useWindowDimensions();
  const displayMedia = useRef('desktop');
  const closeDetails = useCallback(() => dispatch({ type: 'hideDetails', displayMedia: displayMedia.current }), [displayMedia]);
  const openDetails = useCallback(() => dispatch({ type: 'showDetails', displayMedia: displayMedia.current }), [displayMedia]);

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(query, 'movieID')) {
      setSelectedMovie(parseInt(query.movieID, 10));
      openDetails();
    }
  }, [query]);

  useEffect(() => {
    if (width >= 1024) {
      displayMedia.current = 'desktop';
      dispatch({ type: 'resize', displayMedia: displayMedia.current });
    } else {
      displayMedia.current = 'mobile';
      dispatch({ type: 'resize', displayMedia: displayMedia.current });
    }
  }, [width]);

  return (
    <HomePageContext.Provider value={{
      detailsVisibility,
      listVisibility,
      closeDetails,
      openDetails,
      offset: state.pageYOffset,
      isClosed: state.isClosed,
    }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

HomePageProvider.propTypes = {
  children: propTypes.instanceOf(Array).isRequired,
};
