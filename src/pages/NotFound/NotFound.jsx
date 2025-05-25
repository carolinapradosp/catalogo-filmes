import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <>
            <Banner titulo="404" subtitulo={t("notfound.subtitle")} />
            <main style={{ padding: '7% 0' }}>
                <h2>{t("notfound.message")}</h2>
                <p style={{ textAlign: 'center' }}>
                    {t("notfound.suggestion")} <Link to="/"><u>{t("notfound.homeLink")}</u></Link>
                </p>
            </main>
        </>
    );
}
