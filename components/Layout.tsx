import React from "react";
import styled from "styled-components";
import { RowContainer } from "./Container";
import { Sidebar } from "./sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const Container = styled(RowContainer)`
  justify-content: space-between;
`;

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <div>{children}</div>
      <Sidebar />
    </Container>
  );
};
