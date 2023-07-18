import { onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { userDocType } from '@/common/authType';
import { HEADER_NAV } from '@/common/constant';
import { auth } from '@/firebase-config';
import logo from '../../../public/blogLogo.png';
import { BlackMask, FlexContainer, NavLink, SideMenuContainer } from './Header.style';
import MenuIcon from '@mui/icons-material/Menu';
import { getDataById } from '@/common/firebaseFun';
import { TAuthor, useStore } from '@/store/useStore';

export const Header = () => {
  const { user, updateUser, updateAuthor } = useStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const loggedOut = () => {
    signOut(auth)
      .then(() => {
        updateUser({ isLoggedIn: false });
      })
      .catch((error) => {
        console.log(error, 'log out');
      });
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    function updateLoggedInState() {
      updateUser({ isLoggedIn: true });
    }

    const checkIsLoggedIn = () => {
      if (!user.isLoggedIn) {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const currentUser = await getDataById<userDocType>('users', user.uid);
            if (currentUser) {
              updateLoggedInState();
            }
          }
        });
      }
    };
    checkIsLoggedIn();
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 558);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getAuthor = async () => {
      const author = await getDataById<userDocType>('users', 'Xt8axl9b33aG6OuEled4U1SbtZ02');
      if (author) {
        const userData: TAuthor = {
          email: author.email,
          userName: author.name,
          userImg: author.img,
          userIntro: author.intro,
        };
        updateAuthor(userData);
      }
    };
    getAuthor();
  }, []);

  return (
    <FlexContainer>
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src={logo} width="120" alt="logo" />
      </Link>
      {isSmallScreen && <MenuIcon onClick={handleShowMenu} />}
      <BlackMask onClick={handleShowMenu} isShow={isSmallScreen && showMenu} />
      <SideMenuContainer isShow={isSmallScreen && showMenu}>
        <NavLink onClick={handleShowMenu} href={`/${HEADER_NAV.ARTICLE}`}>
          所有文章
        </NavLink>
        <NavLink onClick={handleShowMenu} href={`/${HEADER_NAV.CATEGORY}`}>
          分類
        </NavLink>
        {/* <NavLink onClick={handleShowMenu} href={`/${HEADER_NAV.ABOUT_ME}`}>
          {t(`HEADER.${HEADER_NAV["ABOUT_ME"]}`)}
        </NavLink> */}
        {user.isLoggedIn && (
          <>
            <NavLink onClick={handleShowMenu} href={`/${HEADER_NAV.ADD_POST}`}>
              新增文章
            </NavLink>
            <div
              style={{ marginLeft: '25px' }}
              onClick={() => {
                loggedOut();
                handleShowMenu();
              }}
            >
              登出
            </div>
          </>
        )}
      </SideMenuContainer>
      {!isSmallScreen && (
        <>
          <NavLink href={`/${HEADER_NAV.ARTICLE}`}>所有文章</NavLink>
          <NavLink href={`/${HEADER_NAV.CATEGORY}`}>分類</NavLink>
          {/* <NavLink href={`/${HEADER_NAV.ABOUT_ME}`}>
            {t(`HEADER.${HEADER_NAV["ABOUT_ME"]}`)}
          </NavLink> */}
          {user.isLoggedIn && (
            <>
              <NavLink href={`/${HEADER_NAV.ADD_POST}`}>新增文章</NavLink>
              <div style={{ marginLeft: '25px' }} onClick={loggedOut}>
                登出
              </div>
            </>
          )}
        </>
      )}
    </FlexContainer>
  );
};
