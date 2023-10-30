import React, { Component } from 'react';
import styles from './About.module.scss';

class About extends Component {
  render(): React.ReactNode {
    return (
      <div className={styles.about}>
        <h2>About Page</h2>
        <h4>
          In this App you can find information about the characters of Rick and
          Morty
        </h4>
        <a href="https://rickandmortyapi.com/">The Rick and Morty API</a>
      </div>
    );
  }
}

export default About;
