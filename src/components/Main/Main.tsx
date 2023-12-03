import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Navbar from '../Navbar/Navbar';
import './Main.css';

function DisplayComponent() {
  const formsData = useSelector((state: RootState) => state.form.formsData);

  return (
    <div className="container">
      {formsData.slice().reverse().map((formData, index) => (
        <div key={index} className="card">
          <h2>Data Number: {formsData.length - index}</h2>
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
  const formsData = useSelector((state: RootState) => state.form.formsData);

  return (
    <div className="main">
      <Navbar></Navbar>
      <main>
        <h1>Main Page</h1>
        {formsData.length === 0 ? (
          <p>Please fill out the form</p>
        ) : (
          <DisplayComponent />
        )}
      </main>
    </div>
  );
};

export default Main;
