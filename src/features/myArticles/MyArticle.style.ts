import { TableCell, TableRow, tableCellClasses } from "@mui/material";
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

export const ButtonContainer = styled.div`
  display: flex;
  gap: 13px;
`;

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F8F9FF",
    color: "#3c3c3c",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
