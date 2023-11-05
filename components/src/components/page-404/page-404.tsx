import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './page-404.css';

const Page404: FC = () => {
  return (
    <div className="container">
      <h1>404 page not found.</h1>
      <Link to="/" title="Click here to return to home page.">Return Home</Link>
    </div>
  );
};

export default Page404;

