import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useReducer } from 'react';
import { LoadingProvider } from '../store/loading-context';
import '../../public/locales/i18n/i18n';
import { NextPage } from 'next';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <LoadingProvider>{getLayout(<Component {...pageProps}></Component>)}</LoadingProvider>;
}
