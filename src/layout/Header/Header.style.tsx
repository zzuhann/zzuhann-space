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
`;

export const NavLink = styled(Link)`
  margin-left: 25px;
`;
