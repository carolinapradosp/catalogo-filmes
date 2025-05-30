import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../components/Banner';
import NotFound from '../NotFound/NotFound';
import { useTranslation } from 'react-i18next';
import style from './Detail.module.css'; 
import { fetchMovie } from '../../service/omdbService';

export default function Detail() {
  const { id } = useParams(); 
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const buscarFilme = async () => {
      setCarregando(true);
      try {
        const dados = await fetchMovie({ imdbID: id });

        if (dados?.Response !== 'False') {
          setFilme(dados);
        } else {
          setFilme(null);
        }
      } catch (erro) {
        console.error('Erro ao buscar filme:', erro);
        setFilme(null);
      } finally {
        setCarregando(false);
      }
    };

    buscarFilme();
  }, [id]);

  if (carregando) return <p>{t("detail.loading")}</p>;
  if (!filme) return <NotFound />;

  return (
    <>
      <Banner titulo={filme.Title} />
      <main className={style.detalhe}>
        <div>
          <img
            src={filme.Poster}
            alt={`${t("detail.posterAlt")} ${filme.Title}`}
            style={{ maxWidth: '300px' }}
          />
        </div>
        <div>
          <p><strong>{t("detail.title")}:</strong> {filme.Title}</p>
          <p><strong>{t("detail.year")}:</strong> {filme.Year}</p>
          <p><strong>{t("detail.writer")}:</strong> {filme.Writer}</p>
          <p><strong>{t("detail.language")}:</strong> {filme.Language}</p>
          <p><strong>{t("detail.country")}:</strong> {filme.Country}</p>
          <p><strong>{t("detail.genre")}:</strong> {filme.Genre}</p>
          <p><strong>{t("detail.director")}:</strong> {filme.Director}</p>
          <p><strong>{t("detail.plot")}:</strong> {filme.Plot}</p>
        </div>
      </main>
    </>
  );
}
