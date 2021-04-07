import propTypes from 'prop-types';
import {
  useEffect, createContext, useCallback, useRef,
} from 'react';
import { useImmerReducer } from 'use-immer';
import useWindowDimensions from '../utils/useWindowDimensions';

const initialState = {
  detailsVisibility: 'hidden',
  listVisibility: 'block',
  pageYOffset: 0,
  isClosed: false,
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
      return;
    case 'hideDetails':
      state.detailsVisibility = 'hidden';
      state.listVisibility = 'block';
      state.isClosed = true;
      return;
    default:
      throw new Error();
  }
};

export const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const { detailsVisibility, listVisibility } = state;
  const { width } = useWindowDimensions();
  const displayMedia = useRef('desktop');
  const closeDetails = useCallback(() => dispatch({ type: 'hideDetails', displayMedia: displayMedia.current }), [displayMedia]);
  const openDetails = useCallback(() => dispatch({ type: 'showDetails', displayMedia: displayMedia.current }), [displayMedia]);

  useEffect(() => {
    if (width >= 1024) {
      displayMedia.current = 'desktop';
    } else {
      displayMedia.current = 'mobile';
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
