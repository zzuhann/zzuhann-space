import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContext } from "../store/auth-context";
import { authReducer, authState } from "../store/auth-reducer";
import { ReactElement, ReactNode, useReducer } from "react";
import { LoadingProvider } from "../store/loading-context";
import "../../public/locales/i18n/i18n";
import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [state, dispatch] = useReducer(authReducer, authState);
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <LoadingProvider>
        {getLayout(<Component {...pageProps}></Component>)}
      </LoadingProvider>
    </AuthContext.Provider>
  );
}
