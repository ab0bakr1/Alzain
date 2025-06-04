import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageRegister from './pages/PageRegister';
import PageLogin from './pages/PageLogin';
import PageCart from './pages/PageCart';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Register" element={<PageRegister />} />
                <Route path="/Login" element={<PageLogin />} />
                <Route path="/Cart" element={<PageCart />} />
            </Routes>
        </Router>
    );
}

export default App;
