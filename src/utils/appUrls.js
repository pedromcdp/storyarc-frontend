const pageUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://storyarc.pt';

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://api.storyarc.pt';

const defaultAvatarUrl =
  'https://firebasestorage.googleapis.com/v0/b/storyarc-bf600.appspot.com/o/avatars%2Favatar.webp?alt=media';
export { pageUrl, apiUrl, defaultAvatarUrl };
