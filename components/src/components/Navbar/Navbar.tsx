import React from 'react';
import styles from './Navbar.module.scss';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/">main</Link>
      <Link to="/about">about</Link>
      <Search></Search>
    </div>
  );
};

export default Navbar;
