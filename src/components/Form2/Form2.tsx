import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../../../redux/formSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../Form1/Form.css';
import { nameValidationSchema, ageValidationSchema, emailValidationSchema, passwordValidationSchema2 } from '../Validation/validation';

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
  const [errors, setErrors] = useState({ name: '', age: '', email: '', password: '', confirmPassword: '' });

  const handleValidation = async (field, value) => {
    try {
      let validationSchema;
      switch (field) {
        case 'name': validationSchema = nameValidationSchema; break;
        case 'age': validationSchema = ageValidationSchema; break;
        case 'email': validationSchema = emailValidationSchema; break;
        case 'password': validationSchema = passwordValidationSchema2; break;
        case 'confirmPassword': validationSchema = passwordValidationSchema2; break;
        default: validationSchema = null;
      }
      if (validationSchema) {
        await validationSchema.validate({ [field]: value });
        setErrors({ ...errors, [field]: '' });
      }
    } catch (error) {
      setErrors({ ...errors, [field]: error.message });
    }
  };

  const validatePassword = async (newPassword, newConfirmPassword) => {
    try {
      await passwordValidationSchema2.validate({ password: newPassword, confirmPassword: newConfirmPassword }, { abortEarly: false });
      setErrors({ ...errors, password: '', confirmPassword: '' });
    } catch (error) {
      const updatedErrors = { ...errors };
      error.inner.forEach(err => {
        updatedErrors[err.path] = err.message;
      });
      setErrors(updatedErrors);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePassword(password, newConfirmPassword);
  };

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords don't match" });
      return;
    }
    const newFormData = { name, age, email, password, gender, country, image: imageBase64 };
    dispatch(saveFormData(newFormData));
    navigate('/');
  };

  return (
    <div className="main">
      <h1>Form 2</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required value={name} onChange={(e) => { setName(e.target.value); handleValidation('name', e.target.value); }} />
        {errors.name && <div className="error">{errors.name}</div>}

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" required value={age} onChange={(e) => { setAge(e.target.value); handleValidation('age', e.target.value); }} />
        {errors.age && <div className="error">{errors.age}</div>}

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required value={email} onChange={(e) => { setEmail(e.target.value); handleValidation('email', e.target.value); }} />
        {errors.email && <div className="error">{errors.email}</div>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <label htmlFor="confirm_password">Confirm Password:</label>
        <input
          type="password"
          id="confirm_password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

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
        <input type="text" id="country" name="country" required value={country} onChange={(e) => setCountry(e.target.value)} />
        <br />
        <button type="submit" disabled={!name || !age || !email || !password || !confirmPassword || !gender || !country || Object.values(errors).some(error => error)}>Submit</button>
      </form>
      <Link to="/">
        <button>Back to Main Page</button>
      </Link>
    </div>
  );
}

export default Form2;