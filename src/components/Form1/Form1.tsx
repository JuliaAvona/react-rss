import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import './Form1.css';
import { Link } from 'react-router-dom';
import { saveFormData } from '../../../redux/formSlice';

function Form1() {
  const dispatch = useDispatch();
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  let imageBase64 = '' as string;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        imageBase64 = loadEvent.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFormData = {
      name: name.current ? name.current.value : '',
      age: age.current ? age.current.value : '',
      email: email.current ? email.current.value : '',
      password: password.current ? password.current.value : '',
      gender: gender.current ? gender.current.value : '',
      image: imageBase64,
      country: country.current ? country.current.value : '',
    };
    dispatch(saveFormData(newFormData));
    imageBase64 = '';
  };

  return (
    <div className="main">
      <h1>Form 1</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" pattern="[A-Z][a-zA-Z]*" required ref={name} />
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" min="0" required ref={age} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required ref={email} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}"
          required
          ref={password}
        />
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirmPassword" required />
        <fieldset>
          <legend>Gender:</legend>
          <input type="radio" id="male" name="gender" value="male" ref={gender} />
          <label htmlFor="male">Male</label>

          <input type="radio" id="female" name="gender" value="female" ref={gender} />
          <label htmlFor="female">Female</label>

          <input type="radio" id="other" name="gender" value="other" ref={gender} />
          <label htmlFor="other">Other</label>
        </fieldset>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input type="checkbox" id="terms" name="terms" required />
        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" required list="countries" ref={country} />
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

export default Form1;