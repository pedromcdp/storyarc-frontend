import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#37b780" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://firebase.googleapis.com"
          crossOrigin="true"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="O storyarc é uma plataforma de arquivo de conteúdos que pressupõe a partilha e consulta de informações relativas a espaços e à sua evolução ao longo dos anos, de modo a preservar a memória patrimonial do distrito de Aveiro."
        />
      </Head>
      <body>
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-10 right-0 z-50 flex h-40 w-80 flex-col items-start justify-center rounded-l-xl px-3">
            <h1 className="bg-gradient-to-br from-blue-400 to-fuchsia-700 bg-clip-text text-2xl font-semibold uppercase text-transparent">
              storyarc © {new Date().getFullYear()} | DEV MODE:
              <span className="text-verde"> ON</span>
            </h1>
            <h1 className="bg-gradient-to-br from-blue-400 to-fuchsia-700 bg-clip-text text-2xl font-semibold uppercase text-transparent">
              storyarc © Push Notification Service:
              <span className="text-red-500"> OFF</span>
            </h1>
          </div>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
