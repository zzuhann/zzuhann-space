import * as React from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { delFireStoreDataById, getDataById, updateFirestoreById } from '@/common/firebaseFun';
import { newDateToFormatString } from '@/common/commonFun';
import { Button } from '@/components/common/Common';
import { ButtonContainer, StyledTableCell, StyledTableRow } from './MyArticle.style';
import { Count } from '@/common/articleType';

type Props = {
  articles: any[];
  setArticles: Dispatch<SetStateAction<any[]>>;
};

export function MyArticle({ articles, setArticles }: Props) {
  const [tagArticlesCount, setTagArticlesCount] = useState<Count>();

  const updateTagCount = (tag: string) => {
    if (!tagArticlesCount) return;

    if (tagArticlesCount[tag] === 1) {
      delete tagArticlesCount[tag];
    } else {
      tagArticlesCount[tag] -= 1;
    }

    updateFirestoreById({
      target: 'allTags',
      id: 'tagArticlesCount',
      data: { count: tagArticlesCount },
    });
  };

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
      updateTagCount(articles[index].tag);
    }
  }

  const newArticles = articles.map((item) => {
    return {
      ...item,
      createTime: item.createTime.toDate().toISOString(),
      updateTime: item.updateTime.toDate().toISOString(),
    };
  });

  useEffect(() => {
    const getTagArticlesCount = async () => {
      const response = await getDataById<{ count: Count }>('allTags', 'tagArticlesCount');
      if (response) {
        setTagArticlesCount(response?.count);
      }
    };
    getTagArticlesCount();
  }, []);

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
          {newArticles.map((article, index) => (
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
