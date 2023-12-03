import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Form2.css';
import { Link } from 'react-router-dom';
import { saveFormData } from '../../../redux/formSlice';

function Form2() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [picture, setPicture] = useState(null);
  const [country, setCountry] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = { name, age, email, password, gender, picture, country };
    dispatch(saveFormData(formData));
  };

  return (
    <div className="main">
      <h1>Form 2</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" pattern="[A-Z][a-zA-Z]*" required />
        <label htmlFor="age">Age:</label>
        <input onChange={(e) => setAge(e.target.value)} type="number" id="age" name="age" min="0" required />
        <label htmlFor="email">Email:</label>
        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}"
          required
        />
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirmPassword" required />
        <fieldset>
          <legend>Gender:</legend>
          <input onChange={(e) => setGender(e.target.value)} type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">Male</label>

          <input onChange={(e) => setGender(e.target.value)} type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female">Female</label>

          <input onChange={(e) => setGender(e.target.value)} type="radio" id="other" name="gender" value="other" />
          <label htmlFor="other">Other</label>
        </fieldset>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="picture">Upload Picture:</label>
        <input onChange={(e) => setPicture(e.target.files[0])} type="file" id="picture" name="picture" accept="image/png, image/jpeg" />
        <label htmlFor="country">Country:</label>
        <input onChange={(e) => setCountry(e.target.value)} type="text" id="country" name="country" required list="countries" />
        <datalist id="countries">
          <option value="USA" />
          <option value="Canada" />
          <option value="Mexico" />
        </datalist>
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
      <Link to="/">
        <button>Back to Main Page</button>
      </Link>
    </div>
  );
}

export default Form2;
