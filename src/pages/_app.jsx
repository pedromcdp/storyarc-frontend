import '../styles/globals.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt';
import { wrapper } from '../app/store';

function StoryArc({ Component, pageProps }) {
  dayjs.extend(relativeTime);
  dayjs.locale('pt');

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(StoryArc);
