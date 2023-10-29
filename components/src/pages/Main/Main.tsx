import React from 'react';
import styles from './Main.module.scss';

type Character = {
  image: string;
  name: string;
  species: string;
  type: string;
};

interface State {
  posts: Character[];
  searchQuery: string | null;
}

class Main extends React.Component<Record<string, never>, State> { // Fixed here
  constructor(props: Record<string, never>) { // And here
    super(props);
    this.state = {
      posts: [],
      searchQuery: localStorage.getItem('search'),
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps: Record<string, never>, prevState: State) { // And here
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchCharacters();
    }
  }

  async fetchCharacters() {
    let response;
    const { searchQuery } = this.state;

    if (searchQuery) {
      response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchQuery}`
      );
    } else {
      response = await fetch('https://rickandmortyapi.com/api/character');
    }

    if (response.ok) {
      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        this.setState({ posts: data.results });
      }
    } else {
      console.log('http error ' + response.status);
    }
  }

  renderPosts() {
    return this.state.posts.map((post, index) => (
      <div className={styles.card} key={index}>
        <img src={post.image} alt={post.name} className={styles.image} />
        <div className={styles.info}>
          <div className={styles.name}>Name: {post.name}</div>
          <div className={styles.species}>Species: {post.species}</div>
        </div>
      </div>
    ));
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <div className={styles.main}>
        <h1>Rick and Morty</h1>
        <h2>
          Results for key: {searchQuery ? searchQuery : 'All random characters'}
        </h2>
        <div className={styles.container}>{this.renderPosts()}</div>
      </div>
    );
  }
}

export default Main;
