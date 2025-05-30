import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import style from './Cards.module.css';
import { useTranslation } from 'react-i18next';
import { fetchMovie } from '../../service/omdbService'; 

const DEFAULT_TITLES = [
  'Inception', 'Matrix', 'Interstellar', 'Avatar', 'Titanic',
  'Gladiator', 'Joker', 'Fight Club', 'Batman', 'Superman',
  'Frozen', 'Shrek', 'Toy Story', 'Avengers', 'Deadpool', 'Up'
];

export default function Cards() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (searchTerm) {
          const searchResult = await fetchMovie({ searchTerm });

          if (searchResult?.Search) {
            const details = await Promise.all(
              searchResult.Search.map(({ imdbID }) =>
                fetchMovie({ imdbID })
              )
            );
            setMovies(details.filter(Boolean));
          } else {
            setMovies([]);
          }
        } else {
          const defaultMovies = await Promise.all(
            DEFAULT_TITLES.map(title => fetchMovie({ title }))
          );
          setMovies(defaultMovies.filter(Boolean));
        }
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <section className={style.containerCards} aria-label={t("cards.ariaLabel")}>
      {loading ? (
        <p>{t("cards.loading")}</p>
      ) : movies.length > 0 ? (
        movies.map(movie => (
          <Link to={`/filme/${movie.imdbID}`} key={movie.imdbID} className={style.card}>
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
      ) : (
        <p className={style.noResults}>{t("cards.noResults")}</p>
      )}
    </section>
  );
}
