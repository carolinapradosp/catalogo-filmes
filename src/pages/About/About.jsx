import Banner from "../../components/Banner";
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();

    return (
        <>
            <Banner
                titulo="about.aboutTitle"
                subtitulo="about.aboutSubtitle"
            />
            <main dangerouslySetInnerHTML={{ __html: t("about.content") }} />
        </>
    );
}
