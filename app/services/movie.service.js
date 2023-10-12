import axios from 'axios';

const TMDB_API_KEY = 'a91685b82a6a74c59d943e566c2d1e2b';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovieData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        ...params,
      },
    });

    return response.data || [];
  } catch (error) {
    console.error(`Error fetching TMDB data (${endpoint}):`, error);
    return {};
  }
};

export async function fetchMovies(type) {
  const endpoint = `movie/${type}`;
  const params = { page: 1 };

  const data = await fetchMovieData(endpoint, params);
  return data.results;
}

// export async function fetchMovieDetails(movieId) {
//   const endpoint = `movie/${movieId}`;
//   const data = await fetchMovieData(endpoint);
//   return data;
// }

export async function fetchVideoKey(movieId) {
  const endpoint = `movie/${movieId}/videos`;
  const data = await fetchMovieData(endpoint);
  return data.results[0].key;
}
