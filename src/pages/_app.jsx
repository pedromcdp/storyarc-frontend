import '../styles/globals.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { wrapper } from '../app/store';
import { auth } from '../firebase/firebase';
import { setUser } from '../features/auth/authSlice';

function StoryArc({ Component, pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();
  dayjs.extend(relativeTime);
  dayjs.locale('pt');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            avatar: user.photoURL,
            name: user.displayName,
            email: user.email,
          }),
        );
        if (router.pathname === '/auth/signin') {
          router.replace('/');
        }
      } else {
        dispatch(setUser(user));
      }
    });
  }, []);

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(StoryArc);
