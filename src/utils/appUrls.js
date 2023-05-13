const pageUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://storyarc.pt';

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://storyarc-api-git-master-pmcdp.vercel.app';

const defaultAvatarUrl =
  'https://firebasestorage.googleapis.com/v0/b/storyarc-bf600.appspot.com/o/avatars%2Favatar.webp?alt=media';
export { pageUrl, apiUrl, defaultAvatarUrl };
