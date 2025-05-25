import './reset.css';
import './theme.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Detail from './pages/Detail/Detail';
import NotFound from './pages/NotFound/NotFound';
import Footer from './components/Footer';
import About from './pages/About/About';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/filme/:id" element={<Detail />} />
          <Route path="sobre" element={<About />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
