import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const AuthService = {
  loginWithGoogle: async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      const user = await firebase.auth().signInWithPopup(googleProvider);
      return {
        user,
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
};
