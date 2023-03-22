import styled from "styled-components";
import { ColumnContainer } from "../Container";

export const SidebarColumnContainer = styled(ColumnContainer)`
  background-color: #f8f9ff;
  border-radius: 20px;
  min-height: 400px;
  max-width: 230px;
  padding: 20px 25px;
  gap: 10px;
`;

export const SidebarTitle = styled.div`
  align-self: center;
  font-size: 18px;
  font-weight: bold;
`;

export const SidebarSingleContainer = styled(ColumnContainer)`
  gap: 8px;
`;

export const SidebarText = styled.div`
  font-size: 16px;
  letter-spacing: 0.5px;
`;
