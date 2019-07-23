import React from 'react';
import { Firebase  } from './firebase';
import { History } from 'history';

const FirebaseContext = React.createContext<Firebase | null>(null);

export interface FirebaseContextProps {
  firebase: Firebase
  history: History
}

export const withFirebase = (Component: React.ComponentType<FirebaseContextProps>) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;