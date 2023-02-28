import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthType, userDocType } from "../common/authType";
import { HEADER_NAV } from "../common/constant";
import { getFirestoreDataById } from "../common/firebaseFun";
import { auth } from "../firebase-config";
import { AuthContext } from "../store/auth-context";
import { AuthActionKind } from "../store/auth-reducer";
import { useTranslation } from "react-i18next";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 25px;
`;

export const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const loggedOut = () => {
    const userData: AuthType = {
      isLoggedIn: false,
      userInfo: {
        email: "",
        userName: "",
        userImg: "",
        userIntro: "",
      },
    };
    signOut(auth)
      .then(() => {
        dispatch({ type: AuthActionKind.LOGGEDOUT, payload: userData });
      })
      .catch((error) => {
        console.log(error, "log out");
      });
  };

  useEffect(() => {
    function updateloggedInState(user: userDocType) {
      const userData: AuthType = {
        isLoggedIn: true,
        userInfo: {
          email: user.email,
          userName: user.name,
          userImg: user.img,
          userIntro: user.intro,
        },
      };
      dispatch({ type: AuthActionKind.LOGGEDIN, payload: userData });
    }

    const checkIsLoggedIn = () => {
      if (!state.isLoggedIn) {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            getFirestoreDataById("users", user.uid, updateloggedInState);
          }
        });
      }
    };
    checkIsLoggedIn();
  }, [state, dispatch]);

  return (
    <FlexContainer>
      <FlexContainer>
        <Link href="/">
          <Image
            src="https://fluffy-18025.web.app/static/media/fluffylogo.547d057c91e8e28efd40.png"
            width="60"
            height="40"
            alt="logo"
          />
        </Link>
        <NavLink href={`/${HEADER_NAV.ARTICLE}`}>
          {t(`HEADER.${HEADER_NAV["ARTICLE"]}`)}
        </NavLink>
        <NavLink href={`/${HEADER_NAV.CATEGORY}`}>
          {t(`HEADER.${HEADER_NAV["CATEGORY"]}`)}
        </NavLink>
        <NavLink href={`/${HEADER_NAV.ABOUT_ME}`}>
          {t(`HEADER.${HEADER_NAV["ABOUT_ME"]}`)}
        </NavLink>
        {state.isLoggedIn && (
          <>
            <NavLink href={`/${HEADER_NAV.ADD_POST}`}>
              {t(`HEADER.${HEADER_NAV["ADD_POST"]}`)}
            </NavLink>
            <div style={{ marginLeft: "25px" }} onClick={loggedOut}>
              {t(`HEADER.${HEADER_NAV["LOGGED_OUT"]}`)}
            </div>
          </>
        )}
      </FlexContainer>
      {/* <FlexContainer className="right-side">
        <button onClick={() => i18n.changeLanguage("en")} type="button">
          英文
        </button>
        <button onClick={() => i18n.changeLanguage("zh")} type="button">
          中文
        </button>
      </FlexContainer> */}
    </FlexContainer>
  );
};
