import style from './Banner.module.css';
import { useTranslation } from 'react-i18next';

export default function Banner({ titulo, subtitulo, termoBusca }) {
    const { t } = useTranslation();

    return (
        <section className={style.containerBanner} aria-label={t('banner.aria')}>
            {termoBusca ? (
                <>
                    <h1>{t('banner.resultsFor')} "{termoBusca}"</h1>
                    <h2>{t('banner.checkFoundMovies')}</h2>
                </>
            ) : (
                <>
                    <h1>{t(titulo)}</h1>
                    <h2>{t(subtitulo)}</h2>
                </>
            )}
        </section>
    );
}
