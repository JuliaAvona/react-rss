import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import Main from './pages/Main/Main';
import Error from './pages/Error/Error';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { getPlanets } from './api/api';

const App: React.FC = () => {
  const [page, setPage] = React.useState(1);

  return (
    <BrowserRouter>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Main getPlanets={getPlanets} page={page} />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
