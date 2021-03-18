import create from 'zustand';

const useMoviesStore = create((set) => ({
  selectedMovieId: undefined,
  setSelectedMovie: (movieId) => set(() => ({ selectedMovieId: movieId })),
}));

export default useMoviesStore;
