import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Header } from "./Header/Header";
import { Container, LeftSideContainer } from "./Layout.style";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <LeftSideContainer>{children}</LeftSideContainer>
        <Sidebar />
      </Container>
    </>
  );
};