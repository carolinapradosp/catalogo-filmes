import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import style from './Header.module.css';
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { SiThemoviedatabase } from "react-icons/si";
import { useTranslation } from 'react-i18next';
import { MdTranslate } from "react-icons/md";

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [menuAtivo, setMenuAtivo] = useState(false); // controla menu
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
            setMenuAtivo(false); // fecha o menu ao buscar
        }
    };
    
    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
    };
    
    return (
        <header>
            <nav className={style.nav} aria-label="Menu principal">
                <Link to="/" className={style.logo}>
                    <SiThemoviedatabase size={100} color="#ffff00" />
                </Link>
            
                <button
                className={style.menuToggle}
                aria-label="Abrir ou fechar menu"
                onClick={() => setMenuAtivo(!menuAtivo)}
                >
                    {menuAtivo ? <FaTimes size={24} color="#ffff00" /> : <FaBars size={24} color="#ffff00" />}
                </button>
            
                {menuAtivo && <div className={style.backdrop} onClick={() => setMenuAtivo(false)}></div>}
            
                <div className={`${style.menu} ${menuAtivo ? style.ativo : ''}`}>
                    <form onSubmit={handleSearch} role="search">
                        <input
                        type="search"
                        placeholder={t("searchPlaceholder")}
                        aria-label={t("searchPlaceholder")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">
                            <FaSearch color="#fff" size={20} />
                        </button>
                    </form>
                
                    <ul>
                        <li>
                            <div className={style.idioma}>
                                <MdTranslate color="#fff" size={20} />
                                <select onChange={handleLanguageChange} defaultValue={i18n.language}>
                                    <option value="pt">Português</option>
                                    <option value="en">Inglês</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <Link to="/">{t("inicio")}</Link>
                        </li>
                        <li>
                            <Link to="/sobre">{t("about.aboutTitle")}</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        
    );
}
