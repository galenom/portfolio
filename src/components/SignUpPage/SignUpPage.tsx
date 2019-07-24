import React, { FormEvent, ChangeEvent, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { History } from 'history';

import Firebase, { withFirebase } from '../Firebase';
import { SIGN_UP, HOME } from '../../constants/routes';

const SignUpPage = () => (
  <>
    <h1>Sign Up</h1>
    <SignUpForm />
  </>
)

const SignUpFormBase = ({ firebase, history }: { firebase: Firebase, history: History }) => {

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

    firebase
      .doCreateUserWithEmailAndPassword({ email, password: passwordOne })
      .then( () => {
        setInitialState();
        history.push(HOME);
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

  const setInitialState = () => {
    setUsername('');
    setEmail('');
    setPasswordOne('');
    setPasswordTwo('');
    setError(null);
  }
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

const SignUpForm = compose(
  withRouter,
  withFirebase,
  // @ts-ignore
)(SignUpFormBase);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={SIGN_UP} />
  </p>
);

export default SignUpPage;

export { SignUpFormBase, SignUpLink };