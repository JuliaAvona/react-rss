import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import Main from './pages/Main/Main';
import Error from './pages/Error/Error';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
