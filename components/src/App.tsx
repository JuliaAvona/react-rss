import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import Main from './pages/Main/Main';
import Error from './pages/Error/Error';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
