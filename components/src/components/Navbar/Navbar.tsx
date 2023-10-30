import React, { Component } from 'react';
import styles from './Navbar.module.scss';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';

class Navbar extends Component<Record<string, never>> {
  render(): React.ReactNode {
    return (
      <div className={styles.navbar}>
        <Link to="/">main</Link>
        <Link to="/about">about</Link>
        <Search />
      </div>
    );
  }
}

export default Navbar;
