import styled from "styled-components";

export const Button = styled.div`
  display: flex;
  border: 1px solid black;
  margin-right: 15px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
  :hover {
    background-color: #000;
    color: #fff;
  }
`;
