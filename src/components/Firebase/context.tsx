import React from 'react';
import { Firebase  } from './firebase';

const FirebaseContext = React.createContext<Firebase | null>(null);

interface FirebaseContextProps {
  firebase: Firebase
}

export const withFirebase = (Component: React.ComponentType<FirebaseContextProps>) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;