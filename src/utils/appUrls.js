const pageUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://storyarc.pt';

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://api.storyarc.pt';

export { pageUrl, apiUrl };
