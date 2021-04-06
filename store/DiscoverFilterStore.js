import create from 'zustand';

const useDiscoverFilterStore = create((set) => ({
  genre: {
    id: 0,
    name: 'All',
  },
  setGenre: (genre) => {
    set(() => ({ genre }));
  },
  language: '',
  setLanguage: (language) => set(() => ({ language })),
  page: 0,
  setPage: (page) => set(() => ({ page })),
}));

export default useDiscoverFilterStore;
