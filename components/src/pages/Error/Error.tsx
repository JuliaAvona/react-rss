import React, { Component } from 'react';
import styles from './Error.module.scss';

class Error extends Component {
  render(): React.ReactNode {
    return <h2 className={styles.error}>Error</h2>;
  }
}

export default Error;
