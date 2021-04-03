import { useSelectedMovieStatus } from '../../utils/dbHelper';

const WatchBadge = () => {
  const { movieData, error } = useSelectedMovieStatus();
  if (!movieData || error) return <></>;
  return (
    <div className="bg-pink-200 rounded-sm text-pink-700 absolute top-4 right-0 font-bold text-xs px-0.5 z-10">
      {movieData.is_seen ? 'Seen' : 'In Watch Queue'}
    </div>
  );
};

export default WatchBadge;
