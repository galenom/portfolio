import React, { FormEvent, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import Firebase, { FirebaseContext } from '../Firebase';
import { SIGN_UP } from '../../constants/routes';

const SignUpPage = () => (
  <>
    <h1>Sign Up</h1>
    <FirebaseContext.Consumer>
      {firebase => !!firebase && <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </>
)

const SignUpForm = (props: { firebase: Firebase }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState<{ message: string} | null>(null);
  
  const setters: { [key: string]: any } = {
    setUsername,
    setEmail,
    setPasswordOne,
    setPasswordTwo,
    setError,
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    props.firebase
      .doCreateUserWithEmailAndPassword({ email, password: passwordOne })
      .then( () => {
        setUsername('')
        setEmail('')
        setPasswordOne('')
        setPasswordTwo('')
        setError(null);
      })
      .catch(error => {
        setError(error);
      });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name } } = event;
    const methodSuffix = name.charAt(0).toUpperCase() + name.slice(1)
    const method = `set${methodSuffix}`;
    setters[method](event.target.value);
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit" disabled={isInvalid}>Sign Up</button>

      {error && <p>{error.message}</p>}
    </form>
  )
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={SIGN_UP} />
  </p>
)

export default SignUpPage;

export { SignUpForm, SignUpLink };