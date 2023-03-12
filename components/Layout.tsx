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
  margin-top: 60px;
  max-width: 1000px;
  * {
    /* outline: 1px solid black; */
  }
`;

const LeftSideContainer = styled.div`
  flex: 1;
  max-width: 700px;
  /* margin: 0 auto; */
`;

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <LeftSideContainer>{children}</LeftSideContainer>
      <Sidebar />
    </Container>
  );
};
