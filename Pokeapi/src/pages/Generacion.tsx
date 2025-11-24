import React, { useState, useEffect } from 'react';
import { 
    fetchPokemonData, 
    type PokemonData, 
} from '../api/fetchData';
import { ItemCard } from '../componentes/Card';
import './Generacion.css'; 

const GENERATIONS = {
    Gen1: { min: 1, max: 151 },
    Gen2: { min: 152, max: 251 },
    Gen3: { min: 252, max: 386 },
};

const NUM_ITEMS = 10;


export const GeneracionX = ({ gen }: { gen: 'Gen1' | 'Gen2' | 'Gen3' }) => {
    const { min, max } = GENERATIONS[gen];
    const [items, setItems] = useState<PokemonData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const randomIds: number[] = Array.from({ length: NUM_ITEMS }, () => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        });

        Promise.all(randomIds.map(fetchPokemonData))
            .then(dataArray => {
                setItems(dataArray); 
            })
            .catch(err => {
                console.error("Error al cargar Pokémon:", err);
                setError("Fallo al cargar los Pokémon. Intenta de nuevo.");
            })
            .finally(() => {
                setLoading(false);
            });
            
    }, [gen, min, max]); 

    if (loading) return <h2>Cargando {gen} aleatoria...</h2>;
    if (error) return <h2 className="error-message">Error: {error}</h2>;

    return (
        <>
            <h2>{gen}: 10 Pokémon Aleatorios</h2>
            <div className="generacion-grid">
                {items.map((item, _) => (
                    <ItemCard key={item.numero} item={item} />
                ))}
            </div>
        </>
    );
};


export const RandomPokemon = () => {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const randomId = Math.floor(Math.random() * 386) + 1;

        fetchPokemonData(randomId)
            .then(data => {
                setPokemon(data);
            })
            .catch(err => {
                console.error("Error al cargar Pokémon aleatorio:", err);
                setError("Fallo al cargar el Pokémon aleatorio.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); 

    if (loading) return <p>Cargando Pokémon del Día...</p>;
    if (error) return <p className="error-message">{error}</p>;
    
    return (
        <div style={{ maxWidth: '300px', margin: '20px auto' }}>
            <h3>Pokémon Aleatorio</h3>
            <ItemCard key={pokemon?.numero} item={pokemon as PokemonData} />
        </div>
    );
};


export const Home = () => (
    <div className="page-content">
        <h2>MI POKEAPI</h2>
        <p> La selecion de pokémon es aleatoria </p>
        
        <RandomPokemon /> 
    </div>
);


export const NoPage = () => (
    <div className="page-content">
        <h1>¡404!</h1>
        <h2>Ruta no encontrada</h2>
        <p>Lo sentimos, la página que intentas acceder no existe.</p>
        <img src="/react-ts-pokemon-master/public/404.png" alt="Página no encontrada" style={{ maxWidth: '600px', margin: '20px auto', display: 'block' }} />
    </div>
);
