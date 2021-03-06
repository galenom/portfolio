import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

class Firebase {
  auth: app.auth.Auth
  
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = ({email, password}: LoginCredentials) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  

  doSignInWithEmailAndPassword = ({email, password}: LoginCredentials) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => !!this.auth.currentUser && this.auth.currentUser.updatePassword(password);
}

type LoginCredentials = {
  email: string,
  password: string
}

export default Firebase;

export { Firebase };