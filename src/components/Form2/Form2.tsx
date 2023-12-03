import React from 'react';
import './Form2.css';
import { Link } from 'react-router-dom';

function Form2() {

    return (
        <div className='main'>
            <h1>Form 2</h1>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" pattern="[A-Z][a-zA-Z]*" required />
                <label htmlFor="age">Age:</label>
                <input type="number" id="age" name="age" min="0" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}" required />
                <label htmlFor="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm_password" name="confirmPassword" required />
                <fieldset>
                    <legend>Gender:</legend>
                    <input type="radio" id="male" name="gender" value="male" />
                    <label htmlFor="male">Male</label>

                    <input type="radio" id="female" name="gender" value="female" />
                    <label htmlFor="female">Female</label>

                    <input type="radio" id="other" name="gender" value="other" />
                    <label htmlFor="other">Other</label>
                </fieldset>
                <label htmlFor="terms">Accept Terms and Conditions:</label>
                <input type="checkbox" id="terms" name="terms" />
                <label htmlFor="picture">Upload Picture:</label>
                <input type="file" id="picture" name="picture" accept="image/png, image/jpeg" />
                <label htmlFor="country">Country:</label>
                <input type="text" id="country" name="country" required list="countries" />
                <datalist id="countries">
                    <option value="USA" />
                    <option value="Canada" />
                    <option value="Mexico" />
                </datalist>
                <br />
                <button type="submit">Submit</button>
                <br />
            </form>
            <Link to="/"><button>Back to Main Page</button></Link>
        </div >
    );
}

export default Form2;