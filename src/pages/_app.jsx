import '../styles/globals.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt';
import { Provider } from 'react-redux';
import { store } from '../app/store';

function MyApp({ Component, pageProps }) {
  dayjs.extend(relativeTime);
  dayjs.locale('pt');

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
