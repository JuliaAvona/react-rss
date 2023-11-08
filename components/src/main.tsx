import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App';
import Page404 from './components/page-404/page-404';


const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    errorElement: <Page404 />,
  },
]);

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
