import axios from 'axios';

// Substitua pela sua chave de API do TMDb
const API_KEY = '1ef7a743667667402127014c842e67ed';
const BASE_URL = 'https://api.themoviedb.org/3/';

// Função para buscar filmes
export async function fetchMovies(query) {
  try {
    const response = await axios.get(`${BASE_URL}search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'pt-PT', 
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

// Função para obter detalhes do filme
export async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(`${BASE_URL}movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'pt-PT',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
