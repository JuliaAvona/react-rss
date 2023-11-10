import React, { FC } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import './page-404.css';

interface HttpError extends Error {
  statusText?: string;
}

const Page404: FC = () => {
  const error = useRouteError() as HttpError;
  console.error(error);

  return (
    <div className="container" id="error-page">
      <h2>404 page not found.</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" title="Click here to return to home page.">Return Home</Link>
    </div>
  );
};

export default Page404;

