import * as Yup from 'yup';

export const nameValidationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-ZА-Я].*$/, 'Name must start with a capital letter')
      .required('Name is required'),
  });

export const ageValidationSchema = Yup.object().shape({
    age: Yup.number()
      .min(0, 'Age cannot be negative')
      .required('Age is required')
      .typeError('Age must be a number'),
  });

export const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

export const passwordValidationSchema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .matches(/(?=.*\d)/, 'Password must contain at least one number')
      .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
      .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
      .matches(/(?=.*[\W])/, 'Password must contain at least one special character'),
  });

export const passwordValidationSchema2 = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .matches(/(?=.*\d)/, 'Password must contain at least one number')
    .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[\W])/, 'Password must contain at least one special character'),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .required('Confirm password is required'),
});