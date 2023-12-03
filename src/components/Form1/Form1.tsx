import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import './Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { saveFormData } from '../../../redux/formSlice';
import { nameValidationSchema, ageValidationSchema, emailValidationSchema, passwordValidationSchema } from '../Validation/validation';

function Form1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  let imageBase64 = '' as string;

  const nameErrorRef = useRef<HTMLParagraphElement>(null);
  const ageErrorRef = useRef<HTMLParagraphElement>(null);
  const emailErrorRef = useRef<HTMLParagraphElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);
  const confirmPasswordErrorRef = useRef<HTMLDivElement>(null);

  const validateName = (nameValue) => {
    try {
      nameValidationSchema.validateSync({ name: nameValue });
      if (nameErrorRef.current) {
        nameErrorRef.current.textContent = '';
      }
    } catch (error) {
      if (nameErrorRef.current) {
        nameErrorRef.current.textContent = error.message;
      }
    }
  };

  const validateAge = (ageValue) => {
    try {
      ageValidationSchema.validateSync({ age: ageValue });
      if (ageErrorRef.current) {
        ageErrorRef.current.textContent = '';
      }
    } catch (error) {
      if (ageErrorRef.current) {
        ageErrorRef.current.textContent = error.message;
      }
    }
  };

  const validateEmail = (emailValue) => {
    try {
      emailValidationSchema.validateSync({ email: emailValue });
      if (emailErrorRef.current) {
        emailErrorRef.current.textContent = '';
      }
    } catch (error) {
      if (emailErrorRef.current) {
        emailErrorRef.current.textContent = error.message;
      }
    }
  };

  const confirmPasswordValidation = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      throw new Error('Passwords must match');
    }
  };

  const validatePassword = async () => {
    const passwordValue = password.current?.value;
    const confirmPasswordValue = confirmPassword.current?.value;

    if (passwordErrorRef.current) passwordErrorRef.current.textContent = '';
    if (confirmPasswordErrorRef.current) confirmPasswordErrorRef.current.textContent = '';

    try {
      await passwordValidationSchema.validate({ password: passwordValue });
    } catch (error) {
      if (passwordErrorRef.current) passwordErrorRef.current.textContent = error.message;
      return;
    }

    try {
      confirmPasswordValidation(passwordValue, confirmPasswordValue);
    } catch (error) {
      if (confirmPasswordErrorRef.current) confirmPasswordErrorRef.current.textContent = error.message;
    }
  };

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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.current?.value || !age.current?.value || !email.current?.value ||
      !password.current?.value || !confirmPassword.current?.value ||
      !gender.current?.value || !country.current?.value || !imageBase64) {
      console.log(!name.current?.value);
      console.log(!age.current?.value);
      console.log(!email.current?.value);
      console.log(!password.current?.value);
      console.log(!confirmPassword.current?.value);
      console.log(!gender.current?.value);
      console.log(!country.current?.value);
      console.log(!imageBase64);

      alert('Please fill in all fields');
      return;
    }
    try {
      await nameValidationSchema.validate({ name: name.current.value });
    } catch (error) {
      if (nameErrorRef.current) {
        nameErrorRef.current.textContent = error.message;
      }
      return;
    }

    const newFormData = {
      name: name.current.value,
      age: age.current.value,
      email: email.current.value,
      password: password.current.value,
      gender: gender.current.value,
      image: imageBase64,
      country: country.current.value
    };

    dispatch(saveFormData(newFormData));
    navigate('/');
  };

  return (
    <div className="main">
      <h1>Form 1</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required ref={name} onChange={(e) => validateName(e.target.value)} />
        <div ref={nameErrorRef} className='error'></div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" min="0" required ref={age} onChange={(e) => validateAge(e.target.value)} />
        <div ref={ageErrorRef} className='error'></div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required ref={email} onChange={(e) => validateEmail(e.target.value)} />
        <div ref={emailErrorRef} className='error'></div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          ref={password}
          onChange={validatePassword}
        />
        <div ref={passwordErrorRef} className="error"></div>
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input
          type="password"
          id="confirm_password"
          name="confirmPassword"
          required
          ref={confirmPassword}
          onChange={validatePassword}
        />
        <div ref={confirmPasswordErrorRef} className="error"></div>
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
        <label htmlFor="countrySelect">Country:</label>
        <input type="text" id="countrySelect" name="countryName" required ref={country} />
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