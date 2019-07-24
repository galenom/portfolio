import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

import SignOutButton from '../../components/SignOut';
import { LANDING, SIGN_UP, SIGN_IN, HOME } from '../../constants/routes';

export const Navigation = ({ authUser }: { authUser: boolean }) => {
  const nav = authUser ? <NavigationAuthenticated /> : <NavigationPreAuth />;
  return (
    <>
      { nav }
      <p className="title">
        React Magic
      </p>
    </>
  )
};
const NavigationAuthenticated = () => (
  <nav>
    <ul>
      <li><NavLink exact to={LANDING} activeClassName='active-link'><p>Landing</p></NavLink></li>
      <li><SignOutButton /></li>
      <div className="underbar"></div>
    </ul>
  </nav>
);

const NavigationPreAuth = () => (
  <nav>
    <ul>
      <li><NavLink to={HOME} activeClassName='active-link'><p>Home</p></NavLink></li>
      <li><NavLink to={SIGN_UP} activeClassName='active-link'><p>Sign Up</p></NavLink></li>
      <li><NavLink to={SIGN_IN} activeClassName='active-link'><p>Sign In</p></NavLink></li>
    </ul>
  </nav>
)

