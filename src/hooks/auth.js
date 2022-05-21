import { createContext, useState } from 'react';

const authContext = createContext();

export function AuthProvider() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
}
