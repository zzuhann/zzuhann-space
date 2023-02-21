import styled from "styled-components";
import { ColumnContainer } from "../Container";
import { Profile } from "./Profile";

const Box = styled.div`
  border: 1px solid black;
  height: 150px;
  width: 200px;
`;

export const Sidebar = () => {
  return (
    <ColumnContainer>
      <Profile />
      <Box />
      <Box />
    </ColumnContainer>
  );
};
