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
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="O storyarc é uma plataforma de arquivo de conteúdos que pressupõe a partilha e consulta de informações relativas a espaços e à sua evolução ao longo dos anos, de modo a preservar a memória patrimonial do distrito de Aveiro."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <body>
        {process.env.NODE_ENV === 'development' && (
          <div className="flex fixed right-0 bottom-10 z-50 flex-col justify-center items-start px-3 w-80 h-40 rounded-l-xl">
            <h1 className="text-2xl font-semibold text-transparent uppercase bg-clip-text bg-gradient-to-br from-blue-400 to-fuchsia-700">
              storyarc © {new Date().getFullYear()} | DEV MODE:
              <span className="text-verde"> ON</span>
            </h1>
          </div>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
