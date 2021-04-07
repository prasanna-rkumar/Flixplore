import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AiOutlineClose } from 'react-icons/ai';
import useDiscoverFilterStore from '../../store/DiscoverFilterStore';
import API, { END_POINTS } from '../../tmdb-api';
import Dropdown from './Dropdown';

const GenreDropdown = () => {
  const { data, error } = useQuery(END_POINTS.genres, API.genres);
  const [options, setOptions] = useState([]);
  const { genre, setGenre } = useDiscoverFilterStore(
    (state) => ({ genre: state.genre, setGenre: state.setGenre }),
  );

  useEffect(() => {
    if (data && !error) {
      const resp = [...data.data.genres];
      resp.unshift({
        id: 0,
        name: 'All',
      });
      setOptions(resp);
    }
  }, [data, error]);

  if (genre && genre.id !== 0) {
    return (
      <div className="flex flex-col justify-between">
        <span className=" text-xs font-medium text-gray-400">Genre</span>
        <div className="flex flex-row gap-x-1 items-center justify-around text-base sm:text-lg font-medium text-pink-500">
          <h5>{genre.name}</h5>
          <AiOutlineClose className="text-pink-500 cursor-pointer" size={16} onClick={() => setGenre(options[0])} />
        </div>
      </div>
    );
  }

  if (options.length > 0) return <Dropdown label="Genre" options={options} value={genre} onSelect={(newValue) => setGenre(newValue)} />;
  return <></>;
};

export default GenreDropdown;
