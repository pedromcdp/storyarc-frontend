const pageUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://localhost:8080';

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'http://localhost:8080';

const defaultAvatarUrl =
  'https://firebasestorage.googleapis.com/v0/b/storyarc-bf600.appspot.com/o/avatars%2Favatar.webp?alt=media';
export { pageUrl, apiUrl, defaultAvatarUrl };
