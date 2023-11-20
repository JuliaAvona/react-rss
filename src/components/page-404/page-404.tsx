import React, { FC } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import './page-404.css';
import { HttpError } from '../../types/types';

const Page404: FC<{}> = () => {
  const error = useRouteError();
  const httpError = error instanceof Error ? error as HttpError : undefined;
  console.error(error);

  return (
    <div className="container" id="error-page">
      <h2>404 page not found.</h2>
      <p>
        <i>{httpError?.statusText || httpError?.message || 'An unexpected error occurred'}</i>
      </p>
      <Link to="/" title="Click here to return to home page.">Return Home</Link>
    </div>
  );
};

export default Page404;
