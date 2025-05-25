import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import style from './Cards.module.css';
import { useTranslation } from 'react-i18next';

const DEFAULT_TITLES = [
  'Inception', 'Matrix', 'Interstellar', 'Avatar', 'Titanic',
  'Gladiator', 'Joker', 'Fight Club', 'Batman', 'Superman',
  'Frozen', 'Shrek', 'Toy Story', 'Avengers', 'Deadpool', 'Up'
];

export default function Cards() {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = '1e5700a2';

      if (searchTerm) {
        try {
          const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`);
          const data = await response.json();

          if (data.Response === 'True') {
            const detailedResults = await Promise.all(
              data.Search.map(async (movie) => {
                const detailResponse = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
                return detailResponse.json();
              })
            );
            setMovies(detailedResults.filter(movie => movie?.Response === 'True'));
          } else {
            setMovies([]);
          }
        } catch (error) {
          console.error('Erro na pesquisa:', error);
          setMovies([]);
        }
      } else {
        const results = await Promise.all(
          DEFAULT_TITLES.map(async (title) => {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`);
            const data = await response.json();
            return data?.Response === 'True' ? data : null;
          })
        );
        setMovies(results.filter(Boolean));
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <section className={style.containerCards} aria-label={t("cards.ariaLabel")}>
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <Link to={`/filme/${movie.imdbID}`} key={index} className={style.card}>
            <img src={movie.Poster} alt={`${t("cards.posterAlt")} ${movie.Title}`} />
            <div className={style.infoCard}>
              <h3>{movie.Title}</h3>
              <p><strong>{t("cards.year")}:</strong> {movie.Year}</p>
              <p><strong>{t("cards.writer")}:</strong> {movie.Writer}</p>
              <p><strong>{t("cards.language")}:</strong> {movie.Language}</p>
              <p><strong>{t("cards.country")}:</strong> {movie.Country}</p>
            </div>
          </Link>
        ))
      ) : searchTerm ? (
        <p className={style.noResults}>{t("cards.noResults")}</p>
      ) : (
        <p>{t("cards.loading")}</p>
      )}
    </section>
  );
}
