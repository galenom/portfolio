import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './App.scss';

const Header = () => (
  <header>
    <Navbar />
  </header>
)

const Navbar = () => (
  <>
    <nav>
      <ul>
        <li><NavLink exact to="/" activeClassName='active-link'><p>Home</p></NavLink></li>
        <li><NavLink to="/about" activeClassName='active-link'><p>About</p></NavLink></li>
        <li><NavLink to="/work" activeClassName='active-link'><p>Work</p></NavLink></li>
        <li><NavLink to="/blog" activeClassName='active-link'><p>Blog</p></NavLink></li>
        <div className="underbar"></div>
      </ul>
    </nav>
    <p className="title">
      MARIO GALENO
    </p>
  </>
);

const Content = () => (
  <main>
    <Switch>
      <Route path="/" exact component={() => (<h1>Home</h1>)} />
      <Route path="/about" exact component={() => (<h1>About</h1>)} />
      <Route path="/blog" exact component={() => (<h1>Blog</h1>)} />
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
