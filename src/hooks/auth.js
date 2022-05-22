import { createContext, useState, useContext } from 'react';
import { AuthService } from '../services/authService';

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const loginWithGoogle = async () => {
    const { error: authError, user: authUser } =
      await AuthService.loginWithGoogle();
    setUser(authUser ?? null);
    setError(authError ?? '');
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const exportedContext = {
    user,
    setUser,
    loginWithGoogle,
    logout,
    error,
    setError,
  };

  return <authContext.Provider value={exportedContext} {...props} />;
}
