import axios from 'axios';

const get = ({ endpoint, params = {} }) => {
  params.api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  params.language = 'en-US';
  return axios.get(`https://api.themoviedb.org/3/${endpoint}`, { params });
};

export const END_POINTS = {
  discover: 'discover/movie',
  movie: 'movie/',
  search: 'search/movie',
  image: 'movie/{movie_id}/images',
};

const API = {
  discover: () => {
    const endpoint = END_POINTS.discover;
    const params = {
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: 1,
    };
    return get({ endpoint, params });
  },
  movie: ({ movieId }) => {
    const endpoint = END_POINTS.movie + movieId;
    return get({ endpoint });
  },
  search: (searchTerm) => {
    const endpoint = END_POINTS.search;
    const params = {
      include_adult: false,
      query: searchTerm,
    };
    return get({ endpoint, params });
  },
  image: ({ movieId }) => {
    const endpoint = END_POINTS.image.replace('{movie_id}', movieId);
    const params = {
      include_image_language: 'en',
    };
    return get({ endpoint, params });
  },
};

export default API;
