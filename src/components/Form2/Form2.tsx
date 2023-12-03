import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../../../redux/formSlice';
import { Link, useNavigate } from 'react-router-dom';
import './Form2.css';

function Form2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        alert('Only PNG and JPEG files are allowed');
        return;
      }
      if (file.size > 5242880) {
        alert('File size should not exceed 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImageBase64(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const newFormData = {
      name,
      age,
      email,
      password,
      gender,
      country,
      image: imageBase64,
    };

    dispatch(saveFormData(newFormData));
    navigate('/');
  };

  return (
    <div className="main">
      <h1>Form 2</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" pattern="[A-Z][a-zA-Z]*" required value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" min="0" required value={age} onChange={(e) => setAge(e.target.value)} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}" required value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <fieldset>
          <legend>Gender:</legend>
          <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
          <label htmlFor="male">Male</label>
          <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
          <label htmlFor="female">Female</label>
          <input type="radio" id="other" name="gender" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} />
          <label htmlFor="other">Other</label>
        </fieldset>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input type="checkbox" id="terms" name="terms" required />
        <label htmlFor="picture">Upload Picture:</label>
        <input type="file" id="picture" name="picture" accept="image/png, image/jpeg" onChange={handleImageChange} />
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" required list="countries" value={country} onChange={(e) => setCountry(e.target.value)} />
        <datalist id="countries">
          <option value="USA" />
          <option value="Canada" />
          <option value="Mexico" />
        </datalist>

        <br />
        <button type="submit" disabled={!name || !age || !email || !password || !confirmPassword || !gender || !country}>Submit</button>
      </form>
      <Link to="/">
        <button>Back to Main Page</button>
      </Link>
    </div>
  );
}

export default Form2;
