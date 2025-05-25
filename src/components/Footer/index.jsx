import './Footer.module.css'
import { useTranslation } from 'react-i18next';


export default function Footer() {
    const { t } = useTranslation();

    return(
        <footer>
            <p>{t("footer")}</p>
        </footer> 
    )
}