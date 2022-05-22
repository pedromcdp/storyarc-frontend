import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const AuthService = {
  loginWithGoogle: async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      const userCred = await firebase.auth().signInWithPopup(googleProvider);
      return {
        user: userCred.user,
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
