import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaAngleDoubleRight } from 'react-icons/fa'; 
import './Navbar.css'; 

export const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-item">
                <FaHome size={16}/> Inicio
            </NavLink>
            <NavLink to="/gen1" className="nav-item">
                <FaAngleDoubleRight size={16}/> Generación 1
            </NavLink>
            <NavLink to="/gen2" className="nav-item">
                <FaAngleDoubleRight size={16}/> Generación 2
            </NavLink>
            <NavLink to="/gen3" className="nav-item">
                <FaAngleDoubleRight size={16}/> Generación 3
            </NavLink>
        </nav>
    );
};