import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </nav>
    <span className="title">
      <p>MARIO GALENO</p>
    </span>
  </>
);

const Content = () => (
  <main>
    <Switch>
      <Route path="/" exact component={() => (<h1>Home</h1>)} />
      <Route path="/about" exact component={() => (
        <div>
          <h1>dd</h1>
          <h1>about</h1>
          <h1>about</h1>
          <h1>about</h1>
          <h1>about</h1>
          <h1>about</h1>
        </div>
      )} />
      <Route path="/blog" exact component={() => (<h1>blog</h1>)} />
    </Switch>
  </main>
)

const Footer = () => (
  <footer>
    <p>Mario Galeno <span>&copy;2019</span></p>
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
