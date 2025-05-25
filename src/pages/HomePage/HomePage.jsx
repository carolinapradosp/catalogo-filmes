import Banner from "../../components/Banner";
import Cards from "../../components/Cards";
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search');
    
    return (
        <>
            <Banner
            titulo="homeTitle"
            subtitulo="homeSubtitle"
            termoBusca={searchTerm}
            />
            
            <Cards />
        </>
    )
}