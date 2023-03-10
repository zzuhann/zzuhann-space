import * as React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IArticleFirestore } from "../../common/articleType";
import { RowContainer } from "../Container";
import { Button } from "./MyArticle.style";
import { Dispatch, SetStateAction } from "react";
import { delFireStoreDataById } from "../../common/firebaseFun";
import { newDateToFormatString } from "../../common/commonFun";
// import { useLoadingService } from "../../store/loading-context";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type Props = {
  articles: IArticleFirestore[];
  setArticles: Dispatch<SetStateAction<IArticleFirestore[]>>;
};

export default function MyArticle({ articles, setArticles }: Props) {
  //   const { showLoading, hideLoading } = useLoadingService();

  function deleteArticleUpdateState(index: number) {
    const newArticles = [...articles];
    newArticles.splice(index, 1);
    setArticles(newArticles);
  }

  function deleteArticle(index: number) {
    const collection = "articles";
    const target = articles[index].id;
    if (target) {
      delFireStoreDataById(collection, target);
      deleteArticleUpdateState(index);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>????????????</StyledTableCell>
            <StyledTableCell>??????</StyledTableCell>
            <StyledTableCell>??????</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article, index) => (
            <StyledTableRow key={article.createTime.seconds * 1000}>
              <StyledTableCell component="th" scope="row">
                {newDateToFormatString(
                  new Date(article.createTime.seconds * 1000)
                )}
              </StyledTableCell>
              <StyledTableCell>{article.title}</StyledTableCell>
              <StyledTableCell>
                <RowContainer>
                  <Button>??????</Button>
                  <Button>
                    <Link href={`/my/articles/edit/${article.id}`}>??????</Link>
                  </Button>
                  <Button onClick={() => deleteArticle(index)}>??????</Button>
                </RowContainer>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
