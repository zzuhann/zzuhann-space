import { createContext, Dispatch } from "react";
import { AuthType } from "../common/authType";
import { AuthActionType, authState } from "./auth-reducer";

export const AuthContext = createContext<{
  state: AuthType;
  dispatch: Dispatch<AuthActionType>;
}>({
  state: authState,
  dispatch: () => null,
});
