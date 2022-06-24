import { createContext, useState, useContext } from 'react';
import { AuthService } from '../services/authService';

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

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

  const loginWithEmail = async ({ email, password }) => {
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
