import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { HEADER_NAV, HEADER_NAV_CONTEXT } from "../common/constant";
import { AuthContext } from "../store/auth-context";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 25px;
`;

export const Header = () => {
  const { state } = useContext(AuthContext);
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
          {HEADER_NAV_CONTEXT["article"]}
        </NavLink>
        <NavLink href={`/${HEADER_NAV.ABOUT_ME}`}>
          {HEADER_NAV_CONTEXT["about-me"]}
        </NavLink>
        {state.isLoggedIn && (
          <NavLink href={`/${HEADER_NAV.ADD_POST}`}>
            {HEADER_NAV_CONTEXT["add-post"]}
          </NavLink>
        )}
      </FlexContainer>
      <FlexContainer className="right-side"></FlexContainer>
    </FlexContainer>
  );
};
