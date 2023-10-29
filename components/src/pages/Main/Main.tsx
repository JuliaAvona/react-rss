import React from 'react';
import styles from './Main.module.scss';

interface ICharacter {
  name: string;
  image: string;
  species: string;
  type: string;
}

interface IMainState {
  posts: ICharacter[];
  loading: boolean;
}

class Main extends React.Component<{}, IMainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      posts: [],
      loading: false
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps: {}, prevState: IMainState) {
    if (localStorage.getItem('search') !== prevState.posts[0]?.name) {
      this.fetchCharacters();
    }
  }

  fetchCharacters = async () => {
    this.setState({ loading: true });
    
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
      this.setState({ posts: data.results });
    } else {
      console.log('http error ' + response.status);
    }
    this.setState({ loading: false });
  };

  renderPosts = () => {
    if (this.state.loading) {
      return <div className={styles.spinner}></div>;
    }

    return this.state.posts.map((post, index) => (
      <div className={styles.card} key={index}>
        <img src={post.image} alt={post.name} className={styles.image} />
        <div className={styles.name}>Name: {post.name}</div>
        <div className={styles.species}>Species: {post.species}</div>
        <div className={styles.type}>{post.type}</div>
      </div>
    ));
  };

  render() {
    return (
      <div className={styles.main}>
        <h1>Rick and Morty</h1>
        <h2>
          Characters for key:{' '}
          {localStorage.getItem('search') || 'all random characters'}
        </h2>
        <div className={styles.container}>{this.renderPosts()}</div>
      </div>
    );
  }
}

export default Main;
