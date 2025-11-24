import React from 'react';
import { 
    type PokemonData, 
} from '../api/fetchData';
import './Card.css'; 

type ItemData = PokemonData; 


export const ItemCard = ({ item }: { item: ItemData }) => {
    
    return (
        
        <div className={`card-container ${item.tipo}`}> 
            <h3 className="card-title">
                {`#${item.numero} `} 
                {item.nombre.toUpperCase()}
            </h3>
            <img src={item.img} alt={item.nombre} className="card-image" />
            <div className="card-details">
                <>
                    <p>HP: **{item.hp}**</p>
                    <p>Ataque: **{item.ataque}**</p>
                    <p>Defensa: **{item.defensa}**</p>
                    <p>Experiencia: **{item.experiencia}**</p>
                </>
            </div>
        </div>
    );
};