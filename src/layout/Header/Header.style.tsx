import styled from "styled-components";
import Link from "next/link";

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #f8f9ff;
  padding: 0 15px;
  letter-spacing: 1px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  @media (max-width: 558px) {
    justify-content: space-between;
    padding: 0 25px;
  }
`;

export const NavLink = styled(Link)`
  margin-left: 25px;
`;

export const SideMenuContainer = styled.div<{ isShow: boolean }>`
  transition: 0.3s;
  width: 200px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  padding: ${(props) => (props.isShow ? "25px 0" : 0)};
  gap: 15px;
  box-shadow: ${(props) =>
    props.isShow ? "-0.5px 2px 3px 2px rgba(0, 0, 0, 0.1);" : "none"};
  height: ${(props) => (props.isShow ? "100vh" : 0)};
  overflow: hidden;
`;

export const BlackMask = styled.div<{ isShow: boolean }>`
  width: 100vw;
  height: ${(props) => (props.isShow ? "100vh" : 0)};
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.3s;
`;
