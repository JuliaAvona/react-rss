import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import Form1 from './components/Form1/Form1';
import Form2 from './components/Form2/Form2';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form1" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
