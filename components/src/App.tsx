import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import Main from './pages/Main/Main';
import Error from './pages/Error/Error';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { getPlanets } from './api/api';
import usePagination from './hooks/usePagination';

const App: React.FC = () => {
  const {
    page,
    setPage,
    allPages,
    total,
    limit,
    setLimit
  } = usePagination();

  return (
    <BrowserRouter>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Main getPlanets={getPlanets} page={page} allPages={allPages} setPage={setPage} />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
