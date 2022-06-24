import Axios from 'axios';
import fileDownload from 'js-file-download';

export default function downloadPhoto(url, filename) {
  Axios.get(url, {
    responseType: 'blob',
  }).then((res) => {
    fileDownload(res.data, filename);
  });
}
