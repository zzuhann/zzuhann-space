import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/images/favicon.ico" rel="shortcut icon" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="zzuhann's space to write something I interest in" />
        <meta name="keywords" content="frontend, university, soft-engineer" />
        <meta name="author" content="zzuhann" />
        <meta property="og:title" content="zzuhann's blog" />
        <meta property="og:description" content="zzuhann's space to write something I interest in" />
        <meta property="og:image" content="/images/ogimage.jpeg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
