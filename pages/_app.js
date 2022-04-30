/* eslint-disable @next/next/no-page-custom-font */
import '../styles/globals.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <Head>
      <title>Writing & Pictures</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Jockey+One&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp
