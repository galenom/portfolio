import React, { useState, FormEvent, ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { History } from 'history'

import { SignUpLink } from '../SignUpPage';
import Firebase, { withFirebase } from '../Firebase';
import { HOME } from '../../constants/routes';

const SignInPage = () => (
  <>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </>
)

const SignInFormBase = ({ firebase, history }: { firebase: Firebase, history: History }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ message: string } | null>(null);

  const setters: { [key: string]: any } = {
    setEmail,
    setPassword,
    setError
  }

  const setInitialState = () => {
    setEmail('');
    setPassword('');
    setError(null);
  }

  const onSubmit = (event: FormEvent) => {
    firebase
      .doSignInWithEmailAndPassword({ email, password })
      .then(() => {
        setInitialState();
        history.push(HOME)
      })
      .catch(error => {
        setError(error);
      });

    event.preventDefault();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name } } = event;
    const methodSuffix = name.charAt(0).toUpperCase() + name.slice(1)
    const method = `set${methodSuffix}`;
    setters[method](event.target.value);
  }

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name='email'
        value={email}
        onChange={onChange}
        type='text'
        placeholder='Email Address'
      />
      <input
        name='password'
        value={password}
        onChange={onChange}
        type='password'
        placeholder='Password'
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  )
}

const SignInForm = compose(
  withRouter,
  withFirebase,
  // @ts-ignore
)(SignInFormBase);

export default SignInPage;
export { SignInForm };