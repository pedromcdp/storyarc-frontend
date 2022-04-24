import '../styles/globals.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt';

function MyApp({ Component, pageProps }) {
  dayjs.extend(relativeTime);
  dayjs.locale('pt');

  return <Component {...pageProps} />;
}

export default MyApp;
