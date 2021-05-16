import { useInfiniteQuery } from 'react-query';
import {
  useContext, useCallback, Fragment, useRef, forwardRef, useEffect,
} from 'react';
import propTypes from 'prop-types';
import MovieTile from './MovieTile';
import API, { END_POINTS } from '../../tmdb-api';
import { HomePageContext } from '../../context/HomePageContext';
import CircularProgressIndicator from '../shared/CircularProgressIndicator';
import GenreDropdown from './GenreDropdown';
import useDiscoverFilterStore from '../../store/DiscoverFilterStore';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Button from '../shared/Button';

const LeftPane = () => {
  const { listVisibility } = useContext(HomePageContext);
  return (
    <div className={`col-span-6 col-start-1 lg:col-span-4 lg:col-start-1 lg:col-end-5 ${listVisibility}`}>
      <PaneHeader />
      <MoviesList />
    </div>
  );
};

const PaneHeader = () => (
  <div className="flex flex-row justify-between mb-4 px-3 sticky top-16 bg-primary z-10 py-2">
    <h3 className="text-2xl font-semibold text-white tracking-normal  sm:text-3xl">Trending</h3>
    <div className="flex flex-row justify-center items-end">
      <GenreDropdown />
      {/* <Dropdown label="Language" /> */}
    </div>
  </div>
);

const MoviesList = () => {
  const { genre } = useDiscoverFilterStore((state) => state);
  const fetchDiscoverMovies = useCallback(
    ({ pageParam = 1 }) => API.discover({ genre: genre.id, page: pageParam }), [genre],
  );
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    remove,
    refetch,
  } = useInfiniteQuery(END_POINTS.discover, fetchDiscoverMovies, {
    getNextPageParam: (lastPage) => {
      const { page, total_pages: totalPages } = lastPage.data;
      return (page < totalPages) ? page + 1 : false;
    },
  });

  const loadMoreButtonRef = useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  useEffect(() => {
    remove();
    refetch();
    window.scrollTo(0, 0);
  }, [genre]);

  if (status === 'loading') {
    return (
      <div className="m-auto">
        <CircularProgressIndicator size={50} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 gap-y-4 sm:grid-cols-4">
      {data.pages.map((page) => (
        <Fragment key={page.data.page}>
          {page.data.results.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
            />
          ))}
        </Fragment>
      ))}
      <div className="col-span-full w-24 text-center m-auto pt-3 pb-10">
        <LoadMore
          type="button"
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
};

const LoadMore = forwardRef(({ onClick, isFetchingNextPage }, ref) => {
  if (isFetchingNextPage) return <CircularProgressIndicator size={48} />;
  return (
    <Button
      type="button"
      ref={ref}
      onClick={onClick}
    >
      <span>Load more</span>
    </Button>
  );
});

LoadMore.propTypes = {
  onClick: propTypes.func.isRequired,
  isFetchingNextPage: propTypes.bool.isRequired,
};

export default LeftPane;
