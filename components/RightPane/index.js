import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import MovieDetails from './MovieDetails';
import styles from './CustomScroll.module.css';
import useMoviesStore from '../../store/MoviesStore';
import { AppContext } from '../../context/AppContext';

const RightPane = () => {
  const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);
  const { detailsVisibility, closeDetails } = useContext(AppContext);
  return (
    <div className={`col-span-6 col-start-1 absolute top-0 left-0 flex flex-col gap-2 justify-start items-start mx-auto w-full ${styles.detailScroll} bg-primary z-20 overflow-y-scroll lg:col-span-2 lg:col-start-5 lg:col-end-7 lg:sticky lg:h-3/4 lg:max-w-lg ${detailsVisibility}`} style={{ top: '12.5%', height: '80vh' }}>
      <AiOutlineClose size={24} className="cursor-pointer font-extrabold absolute top-4 right-6 z-20 text-white visible lg:invisible" onClick={closeDetails} />
      {selectedMovieId && <MovieDetails movieId={selectedMovieId} />}
    </div>
  );
};

export default RightPane;
