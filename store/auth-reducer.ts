interface UserInfoType {
  userName: string;
  email: string;
  userImg: string;
  userIntro: string;
}

export interface AuthType {
  isLoggedIn: boolean;
  userInfo: UserInfoType;
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

export enum AuthActionKind {
  LOGGEDIN = "LOGGEDIN",
  LOGGEDOUT = "LOGGEDOUT",
}

export interface AuthActionType {
  type: AuthActionKind;
  payload: AuthType;
}

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
