import '../styles/globals.css';

import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import RolesContext from '../src/auth/RolesContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { roles } = pageProps;

  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css'
          integrity='sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn'
          crossOrigin='anonymous'
        />
      </Head>
      <UserProvider>
        <RolesContext.Provider value={roles}>
          <Component {...pageProps} />
        </RolesContext.Provider>
      </UserProvider>
    </>
  );
};

export default MyApp;
