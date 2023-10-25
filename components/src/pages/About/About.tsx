import React, { useState } from 'react';
import styles from './About.module.scss';

const About = () => {
  const [likes, setLikes] = React.useState(4);
  console.log(likes, setLikes);

  function plus() {
    setLikes(likes + 1);
  }

  function minus() {
    setLikes(likes - 1);
  }

  return (
    <div className={styles.about}>
      <h2>About Page</h2>
      <h4>In this App you can find information about the characters of Rick and Morty</h4>
      <a href="https://rickandmortyapi.com/">The Rick and Morty API</a>
    </div>
  );
};

export default About;
