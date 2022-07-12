/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import PropTypes from 'prop-types';
import cron from 'cron';
import useAuth from '../hooks/auth';
import { SplashScreen } from '../components/SplashScreen';
import Notification from '../components/Notification';

export default function AuthState({ children }) {
  const { setUser, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
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
        await user.reload();
        user = firebase.auth().currentUser;
        const token = await user.getIdToken();
        setToken(token);
      }
      setIsLoading(false);
    });
    job.start();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <>
      {children}
      <Notification />
    </>
  );
}

AuthState.propTypes = {
  children: PropTypes.node.isRequired,
};
