import React, { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import { ICharacter } from '../../types/types';

const Main: React.FC = () => {
  const [posts, setPosts] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCharacter, setCurrentCharacter] = useState<ICharacter | null>(null);

  const openModal = (character: ICharacter) => {
    setCurrentCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextPage = (): void => {
    setPage(page + 1);
  };

  const handlePrevPage = (): void => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const searchTerm = localStorage.getItem('search');

      const url = searchTerm
        ? `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}`
        : `https://rickandmortyapi.com/api/character?page=${page}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setPosts(data.results);
        setTotalPages(data.info.pages);
      } else {
        console.log('http error ' + response.status);
      }
      setLoading(false);
    };

    fetchCharacters();
  }, [page]);

  const renderPosts = () => {
    if (loading) {
      return <div className={styles.spinner}></div>;
    }


    return posts.map((post, index) => (
      <div className={styles.card} key={index} onClick={() => openModal(post)}>
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
      <h2 className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={page === 1}>Prev Page</button>
        Page: {page}/{totalPages}
        <button onClick={handleNextPage} disabled={page === totalPages}>Next Page</button>
      </h2>
      <h2>
        Characters for key:{'  '}
        {localStorage.getItem('search') || 'all random characters'}
      </h2>
      <div className={styles.content}>
        <div className={styles.container}>{renderPosts()}</div>
        <div className={`${styles.modal} ${isModalOpen ? styles.active : ''}`}>
          {currentCharacter && (
            <div className={styles.modalContent}>
              <img src={currentCharacter.image} alt={currentCharacter.name} />
              <p>{currentCharacter.species}</p>
              <p>{currentCharacter.type}</p>
              <h3>{currentCharacter.name}</h3>
              <button onClick={closeModal}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
