import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthType, userDocType } from "@/common/authType";
import { HEADER_NAV } from "@/common/constant";
import { getFirestoreDataById } from "@/common/firebaseFun";
import { auth } from "@/firebase-config";
import { AuthContext } from "@/store/auth-context";
import { AuthActionKind } from "@/store/auth-reducer";
import { useTranslation } from "react-i18next";
import logo from "../../../public/blogLogo.png";
import {
  BlackMask,
  FlexContainer,
  NavLink,
  SideMenuContainer,
} from "./Header.style";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";

export const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 558);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FlexContainer>
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={logo} width="120" alt="logo" />
      </Link>
      {isSmallScreen && <MenuIcon onClick={handleShowMenu} />}
      <BlackMask onClick={handleShowMenu} isShow={isSmallScreen && showMenu} />
      <SideMenuContainer isShow={isSmallScreen && showMenu}>
        <NavLink onClick={handleShowMenu} href={`/${HEADER_NAV.ARTICLE}`}>
          {t(`HEADER.${HEADER_NAV["ARTICLE"]}`)}
        </NavLink>
        <NavLink onClick={handleShowMenu} href={`/${HEADER_NAV.CATEGORY}`}>
          {t(`HEADER.${HEADER_NAV["CATEGORY"]}`)}
        </NavLink>
        <NavLink onClick={handleShowMenu} href={`/${HEADER_NAV.ABOUT_ME}`}>
          {t(`HEADER.${HEADER_NAV["ABOUT_ME"]}`)}
        </NavLink>
        {state.isLoggedIn && (
          <>
            <NavLink onClick={handleShowMenu} href={`/${HEADER_NAV.ADD_POST}`}>
              {t(`HEADER.${HEADER_NAV["ADD_POST"]}`)}
            </NavLink>
            <div
              style={{ marginLeft: "25px" }}
              onClick={() => {
                loggedOut();
                handleShowMenu();
              }}
            >
              {t(`HEADER.${HEADER_NAV["LOGGED_OUT"]}`)}
            </div>
          </>
        )}
      </SideMenuContainer>
      {!isSmallScreen && (
        <>
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
        </>
      )}
    </FlexContainer>
  );
};
