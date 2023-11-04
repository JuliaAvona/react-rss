import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Main.module.scss';
import Pagination from '../../components/Pagination/Pagination';
import { Planet, MainProps } from '../../types/types';
import PlanetCard from '../../components/PlanetCard/PlanetCard';

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}></div>
  );
};

const Main: React.FC<MainProps> = ({ getPlanets, page: initialPage, allPages, setPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get('page')) {
      navigate('/?page=1', { replace: true });
    }
  }, [navigate, location.search]);

  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const query = new URLSearchParams(location.search);
  const currentPage = Number(query.get('page') || 1);

  useEffect(() => {
    if (!query.get('page')) {
      navigate('/?page=1', { replace: true });
    }
  }, [query, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPlanets({ page: currentPage });
        setPlanets(data.results);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getPlanets, currentPage]);

  const handleSetPage = (newPage: number) => {
    navigate(`/?page=${newPage}`);
  };

  return (
    <div className={styles.main}>
      <h1>Planets</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Pagination page={currentPage} allPages={allPages} setPage={handleSetPage} />
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
