import style from './Footer.module.css'
import { useTranslation } from 'react-i18next';


export default function Footer() {
    const { t } = useTranslation();

    return(
        <footer>
            <p className={style.text}>{t("footer")}</p>
        </footer> 
    )
}