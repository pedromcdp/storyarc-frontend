import '../styles/globals.css';
import '../config/firebaseConfig';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { AuthProvider } from '../hooks/auth';
import 'dayjs/locale/pt';
import { wrapper } from '../app/store';
import AuthState from '../layouts/AuthState';
// import CookieBox from '../components/CookieBox';

function StoryArc({ Component, pageProps }) {
  dayjs.extend(relativeTime);
  dayjs.locale('pt');

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.preloadedState}>
        <AuthProvider>
          <AuthState>
            <Component {...pageProps} />
            {/* <CookieBox /> */}
          </AuthState>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(StoryArc);
