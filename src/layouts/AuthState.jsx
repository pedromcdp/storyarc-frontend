/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import PropTypes from 'prop-types';
import useAuth from '../hooks/auth';
import { useAddUserMutation } from '../services/storyarc';

export default function AuthState({ children }) {
  const { setUser, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [addUser] = useAddUserMutation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
        addUser({
          id: user.uid,
          avatar: user.photoURL,
          name: user.displayName,
          email: user.email,
        });
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }
  return children;
}

AuthState.propTypes = {
  children: PropTypes.node.isRequired,
};
