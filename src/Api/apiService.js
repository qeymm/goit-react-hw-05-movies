import axios from 'axios';
const API_KEY = '62088e41c23fad4633c85235ca2f4dac';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getTrending = async () => {
  const response = await axios.get('trending/movie/day', {
    params: { api_key: API_KEY },
  });
  return response.data;
};

export const searchMovies = async query => {
  const response = await axios.get('search/movie', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      query: query,
      page: 1,
      include_adult: false,
    },
  });
  return response.data;
};

export const getMovieDetails = async id => {
  const response = await axios.get(`movie/${id}`, {
    params: { api_key: API_KEY, language: 'en-US' },
  });
  return response.data;
};

export const getMovieCredits = async id => {
  const response = await axios.get(`movie/${id}/credits`, {
    params: { api_key: API_KEY, language: 'en-US' },
  });
  return response.data;
};

export const getReviews = async id => {
  const response = await axios.get(`movie/${id}/reviews`, {
    params: { api_key: API_KEY, language: 'en-US', page: 1 },
  });
  return response.data;
};
