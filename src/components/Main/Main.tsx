import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { FormData } from '../../../types/types';
import Navbar from '../Navbar/Navbar';
import './Main.css';

function DisplayComponent() {
  const formsData = useSelector((state: RootState) => state.form.formsData);

  return (
    <div className="container">
      {formsData.slice().reverse().map((formData, index) => (
        <div key={index} className="card">
          <h2>Data from Form {formsData.length - index}</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Age: {formData.age}</p>
          <p>Password: {formData.password}</p>
          <p>Gender: {formData.gender}</p>
          <p>Country: {formData.country}</p>
          {formData.image && (
            <img src={formData.image} alt="Uploaded" />
          )}
        </div>
      ))}
    </div>
  );
}

const Main = () => {
  return (
    <div className="main">
      <Navbar></Navbar>
      <main>
        <DisplayComponent />
      </main>
    </div>
  );
};

export default Main;
