import React from "react";
import styled from "styled-components";
import { RowContainer } from "./Container";
import { Sidebar } from "./sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const Container = styled(RowContainer)`
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 120px;
  max-width: 1200px;
  margin-bottom: 60px;
  * {
    /* outline: 1px solid black; */
  }
`;

const LeftSideContainer = styled.div`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <LeftSideContainer>{children}</LeftSideContainer>
      <Sidebar />
    </Container>
  );
};
