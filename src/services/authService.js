import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const AuthService = {
  loginWithGoogle: async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      const userCred = await firebase.auth().signInWithPopup(googleProvider);
      const token = await userCred.user.getIdToken();
      return {
        user: userCred.user,
        token,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  },
  signInWithEmailAndPassword: async ({ email, password }) => {
    try {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const token = await userCred.user.getIdToken();
      return {
        user: userCred.user,
        token,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  },
  singUpWithEmailAndPassword: async ({ email, password }) => {
    try {
      const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const token = await userCred.user.getIdToken();
      return {
        user: userCred.user,
        token,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  },
  logout: async () => {
    await firebase.auth().signOut();
  },
  getToken: async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return null;
  },
};