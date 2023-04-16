import * as React from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IArticleFirestore } from '@/common/articleType';
import { Dispatch, SetStateAction } from 'react';
import { delFireStoreDataById } from '@/common/firebaseFun';
import { newDateToFormatString } from '@/common/commonFun';
import { Button } from '@/components/common/Common';
import { ButtonContainer, StyledTableCell, StyledTableRow } from './MyArticle.style';

type Props = {
  articles: IArticleFirestore[];
  setArticles: Dispatch<SetStateAction<IArticleFirestore[]>>;
};

export function MyArticle({ articles, setArticles }: Props) {
  function deleteArticleUpdateState(index: number) {
    const newArticles = [...articles];
    newArticles.splice(index, 1);
    setArticles(newArticles);
  }

  function deleteArticle(index: number) {
    const collection = 'articles';
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
            <StyledTableCell>建立日期</StyledTableCell>
            <StyledTableCell>標題</StyledTableCell>
            <StyledTableCell>動作</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article, index) => (
            <StyledTableRow key={article.title}>
              <StyledTableCell component="th" scope="row">
                {newDateToFormatString(new Date(article.createTime))}
              </StyledTableCell>
              <StyledTableCell>{article.title}</StyledTableCell>
              <StyledTableCell>
                <ButtonContainer>
                  <Button>
                    <Link href={`/articles/${article.id}`}>預覽</Link>
                  </Button>
                  <Button>
                    <Link href={`/my/articles/edit/${article.id}`}>編輯</Link>
                  </Button>
                  <Button onClick={() => deleteArticle(index)}>刪除</Button>
                </ButtonContainer>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
