import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './componentes/Navbar';
import { GeneracionX, Home, NoPage } from './pages/Generacion';
import './WebPokemon.css'; 


export const App = () => {
    return (
        <Router>
            <header>
                <h1>Pokémon de Rocío</h1> 
            </header>
            
            <Navbar />

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    
                    <Route path="/gen1" element={<GeneracionX gen="Gen1" />} />
                    <Route path="/gen2" element={<GeneracionX gen="Gen2" />} /> 
                    <Route path="/gen3" element={<GeneracionX gen="Gen3" />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} Implementación de Aplicaciones Web</p>
            </footer>
        </Router>
    );
};
export default App;