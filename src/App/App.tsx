import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './App.scss';
import { LANDING, SIGN_UP, SIGN_IN, HOME } from '../constants/routes';
import SignUpPage from '../components/SignUpPage/SignUpPage';

const Header = () => (
  <header>
    <Navbar />
  </header>
)

const Navbar = () => (
  <>
    <nav>
      <ul>
        <li><NavLink exact to={LANDING} activeClassName='active-link'><p>Landing</p></NavLink></li>
        <li><NavLink to={SIGN_UP} activeClassName='active-link'><p>Sign Up</p></NavLink></li>
        <li><NavLink to={SIGN_IN} activeClassName='active-link'><p>Sign In</p></NavLink></li>
        <li><NavLink to={HOME} activeClassName='active-link'><p>Home</p></NavLink></li>
        <div className="underbar"></div>
      </ul>
    </nav>
    <p className="title">
      React Magic
    </p>
  </>
);

const Content = () => (
  <main>
    <Switch>
      <Route path={LANDING} exact component={() => (<h1>Landing</h1>)} />
      <Route path={SIGN_UP} exact component={() => (<SignUpPage />)} />
      <Route path={SIGN_IN} exact component={() => (<h1>Sign In</h1>)} />
      <Route path={HOME} exact component={() => (<h1>Home</h1>)} />
    </Switch>
  </main>
)

const Footer = () => (
  <footer>
    <p className='footer'>Mario Galeno <span>&copy;2019</span></p>
  </footer>
)

const App = () => {
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
