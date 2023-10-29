import React from 'react';
import styles from './Search.module.scss';

interface ISearchState {
  search: string;
}

class Search extends React.Component<{}, ISearchState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      search: ''
    };
  }

  getSearch = (): void => {
    if (!this.state.search) return;
    localStorage.setItem('search', this.state.search);
    window.location.reload();
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.keyCode === 13) {
      this.getSearch();
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search #Rick"
          value={this.state.search}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <button type="submit" onClick={this.getSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
