// Main.tsx
import React, { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import Pagination from '../../components/Pagination/Pagination';
import { Planet, MainProps } from '../../types/types';
import PlanetCard from '../../components/PlanetCard/PlanetCard';

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}></div>
  );
};

const Main: React.FC<MainProps> = ({ getPlanets, page, allPages, setPage }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPlanets({ page: page });
        setPlanets(data.results);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getPlanets, page]);

  return (
    <div className={styles.main}>
      <h1>Planets</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Pagination page={page} allPages={allPages} setPage={setPage} />
          <div className={styles.planets}>
            {planets?.map((planet) => (
              <PlanetCard key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
