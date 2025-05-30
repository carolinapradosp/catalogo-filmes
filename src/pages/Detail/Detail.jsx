import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../components/Banner';
import NotFound from '../NotFound/NotFound';
import { useTranslation } from 'react-i18next';
import style from './Detail.module.css'; 
import { fetchMovie } from '../../service/omdbService';

export default function Detail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const buscarFilme = async () => {
      setLoading(true);
      try {
        const dados = await fetchMovie({ imdbID: id });

        if (dados?.Response !== 'False') {
          setMovie(dados);
        } else {
          setMovie(null);
        }
      } catch (erro) {
        console.error('Erro ao buscar filme:', erro);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    buscarFilme();
  }, [id]);

  if (loading) return <p>{t("detail.loading")}</p>;
  if (!movie) return <NotFound />;

  return (
    <>
      <Banner titulo={movie.Title} />
      <main className={style.detalhe}>
        <div>
          <img
            src={movie.Poster}
            alt={`${t("detail.posterAlt")} ${movie.Title}`}
            style={{ maxWidth: '300px' }}
          />
        </div>
        <div>
          <p><strong>{t("detail.title")}:</strong> {movie.Title}</p>
          <p><strong>{t("detail.year")}:</strong> {movie.Year}</p>
          <p><strong>{t("detail.writer")}:</strong> {movie.Writer}</p>
          <p><strong>{t("detail.language")}:</strong> {movie.Language}</p>
          <p><strong>{t("detail.country")}:</strong> {movie.Country}</p>
          <p><strong>{t("detail.genre")}:</strong> {movie.Genre}</p>
          <p><strong>{t("detail.director")}:</strong> {movie.Director}</p>
          <p><strong>{t("detail.plot")}:</strong> {movie.Plot}</p>
        </div>
      </main>
    </>
  );
}
