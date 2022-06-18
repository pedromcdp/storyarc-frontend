/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import PropTypes from 'prop-types';
import cron from 'cron';
import useAuth from '../hooks/auth';
import { useAddUserMutation } from '../services/storyarc';
import { SplashScreen } from '../components/SplashScreen';

export default function AuthState({ children }) {
  const { setUser, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [addUser] = useAddUserMutation();
  const [job] = useState(
    new cron.CronJob('0 */15 * * * *', async () => {
      if (firebase.auth().currentUser) {
        const token = await firebase.auth().currentUser.getIdToken();
        setToken(token);
      }
    }),
  );

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
    job.start();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return children;
}

AuthState.propTypes = {
  children: PropTypes.node.isRequired,
};
