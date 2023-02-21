import styled from "styled-components";
import { ColumnContainer } from "../Container";

const Box = styled.div`
  border: 1px solid black;
  height: 150px;
  width: 100px;
`;

export const Sidebar = () => {
  return (
    <ColumnContainer>
      <Box />
      <Box />
      <Box />
    </ColumnContainer>
  );
};
