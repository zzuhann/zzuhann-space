export interface userDocType {
  email: string;
  img: string;
  intro: string;
  name: string;
}

export interface UserInfoType {
  userName: string;
  email: string;
  userImg: string;
  userIntro: string;
}

export interface AuthType {
  isLoggedIn?: boolean;
  userInfo?: UserInfoType;
}
