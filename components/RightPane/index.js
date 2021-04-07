import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import MovieDetails from './MovieDetails';
import useMoviesStore from '../../store/MovieStore';
import { HomePageContext } from '../../context/HomePageContext';

const RightPane = () => {
  const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);
  const { detailsVisibility, closeDetails } = useContext(HomePageContext);
  return (
    <div className={`custom-scroll col-span-6 col-start-1 absolute top-0 left-0 flex flex-col gap-2 justify-start items-start mx-auto w-full bg-primary z-20 overflow-y-scroll lg:col-span-2 lg:col-start-5 lg:col-end-7 lg:sticky lg:h-3/4 lg:max-w-lg ${detailsVisibility}`} style={{ top: '12.5%', height: 'calc(100vh - 6rem)' }}>
      <AiOutlineClose size={24} className="cursor-pointer font-extrabold absolute top-4 right-6 z-20 text-white visible lg:invisible" onClick={closeDetails} />
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} />}
    </div>
  );
};

export default RightPane;
