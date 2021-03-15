import axios from "axios"

const ROOT_URL = "https://api.themoviedb.org/3/"

const get = ({ endpoint, params }) => {
  return axios.get(`${ROOT_URL}${endpoint}`, { params })
}

export const END_POINTS = {
  discover: "discover/movie/",
  movie: "movie/",
}

const API = {
  discover: () => {
    const endpoint = END_POINTS.discover
    const params = {
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      language: "en-US",
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: false,
      page: 1
    }
    return get({ endpoint, params })
  },
  movie: ({ movieId }) => {
    const endpoint = END_POINTS.movie + movieId
    const params = {
      api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
      language: "en-US",
    }
    return get({ endpoint, params })
  }
}

export default API