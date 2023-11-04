import React, { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import Pagination from '../../components/Pagination/Pagination';
import { Planet, MainProps } from '../../types/types';

const Main: React.FC<MainProps> = ({ getPlanets, page }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlanets({ page: page });
        setPlanets(data.results);
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };
    fetchData();
  }, [getPlanets, page]);


  return (
    <div className={styles.main}>
      <h1>Planets</h1>
      <Pagination page={page} />
      <div className={styles.planets}>
        {planets?.map((planet, index) => (
          <div key={index} className={styles.planet}>
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
        ))}
      </div>
    </div>
  );
}

export default Main;
