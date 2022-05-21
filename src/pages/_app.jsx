import '../styles/globals.css';
import '../config/firebaseConfig';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { wrapper } from '../app/store';
// import { auth } from '../firebase/firebase';

function StoryArc({ Component, pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();
  dayjs.extend(relativeTime);
  dayjs.locale('pt');

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       dispatch(
  //         setUser({
  //           uid: user.uid,
  //           avatar: user.photoURL,
  //           name: user.displayName,
  //           email: user.email,
  //         }),
  //       );
  //       if (router.pathname === '/auth/signin') {
  //         router.push('/');
  //       }
  //     } else {
  //       dispatch(setUser(user));
  //     }
  //   });
  // }, []);

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(StoryArc);
