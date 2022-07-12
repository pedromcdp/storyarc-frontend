import '../styles/globals.css';
import '../config/firebaseConfig';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { parseCookies } from 'nookies';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { AuthProvider } from '../hooks/auth';
import 'dayjs/locale/pt';
import AuthState from '../layouts/AuthState';
import CookieBox from '../components/CookieBox';

function StoryArc({ Component, pageProps }) {
  dayjs.extend(relativeTime);
  dayjs.locale('pt');
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: Infinity,
      },
    },
  });
  const { acceptedCookies } = parseCookies();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.preloadedState}>
          <AuthProvider>
            <AuthState>
              <Component {...pageProps} />
              {acceptedCookies !== 'ouioui' && <CookieBox />}
              <ReactQueryDevtools />
            </AuthState>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default StoryArc;
