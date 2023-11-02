import React, { useState, useEffect } from 'react';
import styles from './Main.module.scss';

interface ICharacter {
  name: string;
  image: string;
  species: string;
  type: string;
}

const Main: React.FC = () => {
  const [posts, setPosts] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const throwError = () => {
    throw new Error('Error Boundary Test!');
  }

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);

      let response: Response;
      const searchTerm = localStorage.getItem('search');

      if (searchTerm) {
        response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
        );
      } else {
        response = await fetch('https://rickandmortyapi.com/api/character');
      }

      if (response.ok) {
        const data = await response.json();
        setPosts(data.results);
      } else {
        console.log('http error ' + response.status);
      }
      setLoading(false);
    };

    fetchCharacters();
  }, []);

  const renderPosts = () => {
    if (loading) {
      return <div className={styles.spinner}></div>;
    }

    return posts.map((post, index) => (
      <div className={styles.card} key={index}>
        <img src={post.image} alt={post.name} className={styles.image} />
        <div className={styles.name}>Name: {post.name}</div>
        <div className={styles.species}>Species: {post.species}</div>
        <div className={styles.type}>{post.type}</div>
      </div>
    ));
  };

  return (
    <div className={styles.main}>
      <h1>Rick and Morty</h1>
      <button onClick={throwError}>Throw Error</button>
      <h2>
        Characters for key:
        {localStorage.getItem('search') || 'all random characters'}
      </h2>
      <div className={styles.container}>{renderPosts()}</div>
    </div>
  );
}

export default Main;
