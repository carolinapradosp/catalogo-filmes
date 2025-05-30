const API_KEY = '1e5700a2';
const BASE_URL = 'https://www.omdbapi.com/';

export async function fetchMovie({ searchTerm, title, imdbID }) {
  let query = '';

  if (searchTerm) {
    query = `s=${encodeURIComponent(searchTerm)}`;
  } else if (title) {
    query = `t=${encodeURIComponent(title)}`;
  } else if (imdbID) {
    query = `i=${imdbID}`;
  } else {
    return null;
  }

  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&${query}`);
  const data = await response.json();
  return data?.Response === 'True' ? data : null;
}