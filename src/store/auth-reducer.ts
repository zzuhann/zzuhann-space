import { AuthType } from "../common/authType";

export enum AuthActionKind {
  LOGGEDIN = "LOGGEDIN",
  LOGGEDOUT = "LOGGEDOUT",
  UPDATEPROFILE = "UPDATEPROFILE",
}

export interface AuthActionType {
  type: AuthActionKind;
  payload: AuthType;
}

export const authState: AuthType = {
  isLoggedIn: false,
  userInfo: {
    userName: "",
    email: "",
    userImg: "",
    userIntro: "",
  },
};

const authReducer = (state = authState, action: AuthActionType) => {
  switch (action.type) {
    case AuthActionKind.LOGGEDIN:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: {
          userName: action.payload.userInfo.userName,
          email: action.payload.userInfo.email,
          userImg: action.payload.userInfo.userImg,
          userIntro: action.payload.userInfo.userIntro,
        },
      };
    case AuthActionKind.UPDATEPROFILE:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: {
          ...state.userInfo,
          userImg: action.payload.userInfo.userImg,
        },
      };
    case AuthActionKind.LOGGEDOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {
          userName: "",
          email: "",
          userImg: "",
          userIntro: "",
        },
      };
    default:
      return state;
  }
};

export { authReducer };
