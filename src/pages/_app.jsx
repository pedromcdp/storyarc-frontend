import '../styles/globals.css';
import '../config/firebaseConfig';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AuthProvider } from '../hooks/auth';
import 'dayjs/locale/pt';
import { wrapper } from '../app/store';
import AuthState from '../layouts/AuthState';

function StoryArc({ Component, pageProps }) {
  dayjs.extend(relativeTime);
  dayjs.locale('pt');

  return (
    <AuthProvider>
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </AuthProvider>
  );
}

export default wrapper.withRedux(StoryArc);
