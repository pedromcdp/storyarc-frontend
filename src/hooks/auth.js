import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { createContext, useState, useContext, useEffect } from 'react';
import { AuthService } from '../services/authService';

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  // listen for token changes
  // fix for token not being valid after x amount of time
  // clean up AuthState -- remove cron job
  useEffect(
    () =>
      firebase.auth().onIdTokenChanged(async (firebaseUser) => {
        if (!firebaseUser) {
          setUser(null);
          setToken(null);
          return;
        }
        const firebaseToken = await firebaseUser.getIdToken();
        setToken(firebaseToken);
        setUser(firebaseUser);
      }),
    [],
  );

  // Force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const refreshedUser = firebase.auth().currentUser;
      if (refreshedUser) await refreshedUser.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  const loginWithGoogle = async () => {
    const {
      error: authError,
      user: authUser,
      token: authToken,
    } = await AuthService.loginWithGoogle();
    setUser(authUser ?? null);
    setToken(authToken ?? null);
    setError(authError ?? '');
  };

  const loginWithEmail = async (email, password) => {
    const {
      error: emailError,
      user: emailUser,
      token: emailToken,
    } = await AuthService.signInWithEmailAndPassword(email, password);
    setUser(emailUser ?? null);
    setToken(emailToken ?? null);
    setError(emailError ?? '');
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const createUserWithEmailAndPassword = async (
    email,
    password,
    name,
    photoUrl,
  ) => {
    const {
      error: createError,
      user: createUser,
      token: createToken,
    } = await AuthService.singUpWithEmailAndPassword(
      email,
      password,
      name,
      photoUrl,
    );
    setUser(createUser ?? null);
    setToken(createToken ?? null);
    setError(createError ?? '');
  };

  const exportedContext = {
    user,
    setUser,
    loginWithGoogle,
    loginWithEmail,
    logout,
    createUserWithEmailAndPassword,
    token,
    setToken,
    error,
    setError,
  };

  return <authContext.Provider value={exportedContext} {...props} />;
}
