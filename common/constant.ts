export enum HEADER_NAV {
  ARTICLE = "article",
  ABOUT_ME = "about-me",
  ADD_POST = "add-post",
  LOGGED_OUT = "logged-out",
}

export const HEADER_NAV_CONTEXT = {
  [HEADER_NAV.ARTICLE]: "文章列表",
  [HEADER_NAV.ABOUT_ME]: "關於我",
  [HEADER_NAV.ADD_POST]: "新增文章",
  [HEADER_NAV.LOGGED_OUT]: "登出",
};
