import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './App.scss';

import Navigation from './Navigation';
import SignInPage from '../components/SignInPage';
import SignUpPage from '../components/SignUpPage';
import { LANDING, SIGN_UP, SIGN_IN, HOME } from '../constants/routes';

const Header = () => (
  <header>
    <Navigation authUser={false}/>
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

export const App = () => {
  const [authUser, setAuthUser] = useState(null);

  return (
    <Router>
      <Header />
      <Content />
      <Footer />
    </Router>
  );
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App);
