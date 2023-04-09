import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContext } from "../store/auth-context";
import { authReducer, authState } from "../store/auth-reducer";
import { useReducer } from "react";
import { LoadingProvider } from "../store/loading-context";
import "../../public/locales/i18n/i18n";
import { Layout } from "../layout";

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(authReducer, authState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <LoadingProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoadingProvider>
    </AuthContext.Provider>
  );
}
