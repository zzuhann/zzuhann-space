import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContext } from "../store/auth-context";
import { authReducer, authState } from "../store/auth-reducer";
import { useReducer } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(authReducer, authState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
