// PlanetCard.tsx
import React from 'react';
import styles from './PlanetCard.module.scss';
import { Planet } from '../../types/types';

interface PlanetCardProps {
    planet: Planet;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
    return (
        <div className={styles.planet}>
            <h2>{planet.name}</h2>
            <p><strong>Rotation Period:</strong> {planet.rotation_period}</p>
            <p><strong>Orbital Period:</strong> {planet.orbital_period}</p>
            <p><strong>Diameter:</strong> {planet.diameter}</p>
            <p><strong>Climate:</strong> {planet.climate}</p>
            <p><strong>Gravity:</strong> {planet.gravity}</p>
            <p><strong>Terrain:</strong> {planet.terrain}</p>
            <p><strong>Surface Water:</strong> {planet.surface_water}</p>
            <p><strong>Population:</strong> {planet.population}</p>
            <p><strong>Created:</strong> {planet.created}</p>
            <p><strong>Edited:</strong> {planet.edited}</p>
        </div>
    );
}

export default PlanetCard;
