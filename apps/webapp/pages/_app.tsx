import { AppProps } from 'next/app';
import Head from 'next/head';

import { css } from '@emotion/react';

import { Header } from '../components//header';
import { GlobalStyles } from '../components/global-styles';
import { Navigation } from '../components/navigation';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Unofficial AoC solutions</title>
      </Head>
      <GlobalStyles />
      <Header />
      <div css={css({display: 'flex', gap: '16px', minHeight: 'calc(100% - 38px)'})}>
        <Navigation />
        <Component {...pageProps} />
      </div>
    </>
  );
}
