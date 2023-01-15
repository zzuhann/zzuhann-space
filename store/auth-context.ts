import { createContext, Dispatch } from "react";
import { AuthActionType, authState, AuthType } from "./auth-reducer";

export const AuthContext = createContext<{
  state: AuthType;
  dispatch: Dispatch<AuthActionType>;
}>({
  state: authState,
  dispatch: () => null,
});
