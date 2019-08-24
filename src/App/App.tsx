import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';

import './App.scss';

import Navigation from './Navigation';
import SignInPage from '../components/SignInPage';
import SignUpPage from '../components/SignUpPage';
import { LANDING, SIGN_UP, SIGN_IN, HOME } from '../constants/routes';
import Firebase, { withFirebase } from '../components/Firebase';
import { User } from 'firebase';

const Header = ({ authUser }: { authUser?: User }) => (
  <header>
    <Navigation authUser={authUser}/>
  </header>
)

const Content = () => (
  <main>
    <Switch>
      <Route path={LANDING} exact component={() => (<h1>Landing</h1>)} />
      <Route path={SIGN_UP} exact component={() => (<SignUpPage />)} />
      <Route path={SIGN_IN} exact component={() => (<SignInPage />)} />
      <Route path={HOME} exact component={() => (<h1>Home</h1>)} />
    </Switch>
  </main>
)

const Footer = () => (
  <footer>
    <p className='footer'>Mario Galeno <span>&copy;2019</span></p>
  </footer>
)

export const App = ({ firebase }: { firebase: Firebase }) => {
  const [authUserDetails, setAuthUserDetails] = useState<User | undefined>(undefined);
  const [listener] = useState<(() => void) | undefined>(undefined)

  useEffect(() => {
    if (!listener) {
      const unsuscribe = firebase.auth.onAuthStateChanged((authUser) => {
        let userDetails = authUser || undefined;
        setAuthUserDetails(userDetails);
      })

      // TODO: Why does this break everything
      // setListener(() => {
      //   unsuscribe();
      // });

      return () => {
        unsuscribe();
      };
    }
  }, [authUserDetails, firebase.auth, listener])

  return (
    <Router>
      <Header authUser={authUserDetails} />
      <Content />
      <Footer />
    </Router>
  );
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
