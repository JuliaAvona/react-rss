import React from 'react';
import styles from './Main.module.scss';

const Main = () => {
  const [posts, setPosts] = React.useState([]);

  const fetchCharacters = async () => {
    let response: string | undefined;
    localStorage.getItem('search')
      ? (response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${localStorage.getItem('search')}`
        ))
      : (response = await fetch('https://rickandmortyapi.com/api/character'));

    if (response.ok) {
      const data = await response.json();
      setPosts(data.results);
    } else {
      console.log('http error ' + response.status);
    }
  };

  const renderPosts = () => {
    fetchCharacters();

    return posts.map((post: [string], index: number) => {
      return (
        <div className={styles.card} key={index}>
          <img src={post.image} alt={post.name} className={styles.image} />
          <div className={styles.name}>Name: {post.name}</div>
          <div className={styles.species}>Species: {post.species}</div>
          <div className={styles.type}>{post.type}</div>
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles.main}>
        <h1>Rick and Morty</h1>
        <h2>
          Characters for key:{' '}
          {localStorage.getItem('search')
            ? localStorage.getItem('search')
            : 'all random characters'}
        </h2>
        <div className={styles.container}>{renderPosts()}</div>
      </div>
    </>
  );
};

export default Main;
