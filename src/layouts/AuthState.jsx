/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import PropTypes from 'prop-types';
import useAuth from '../hooks/auth';

export default function AuthState({ children }) {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
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
