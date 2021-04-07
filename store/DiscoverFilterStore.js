import create from 'zustand';

const useDiscoverFilterStore = create((set) => ({
  genre: {
    id: 0,
    name: 'All',
  },
  setGenre: (genre) => set((state) => ({ ...state, genre })),
}));

export default useDiscoverFilterStore;
