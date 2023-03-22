import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";
import { IArticleFirestore } from "../../common/articleType";
import { newDateToFormatString } from "../../common/commonFun";
import { ColumnContainer } from "../Container";

const CategoryTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const AllArticleContainer = styled.div`
  border-left: solid 2px #b3b3b3;
  padding-left: 15px;
  margin-top: 10px;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const DateText = styled.div`
  width: 100px;
  color: #b3b3b3;
  letter-spacing: 1px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const TAG = styled.div`
  background-color: #20538f;
  color: #fff;
  border-radius: 3px;
  padding: 5px;
  font-size: 14px;
  width: 85px;
  text-align: center;
`;

type Props = {
  articles: IArticleFirestore[];
  isCategory: boolean;
};

const Block = ({ articles, isCategory }: Props) => {
  const sortArticles = useMemo(() => {
    if (!isCategory) {
      return articles.reduce(
        (acc: { [key: number | string]: IArticleFirestore[] }, item) => {
          const year = new Date(item.createTime.seconds * 1000).getFullYear();
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(item);
          return acc;
        },
        {}
      );
    } else {
      return articles.reduce(
        (acc: { [key: string]: IArticleFirestore[] }, item) => {
          if (!acc[item.tag]) {
            acc[item.tag] = [];
          }
          acc[item.tag].push(item);
          return acc;
        },
        {}
      );
    }
  }, [isCategory, articles]);

  return (
    <ColumnContainer>
      {Object.keys(sortArticles).map((key) => (
        <div key={key}>
          <CategoryTitle>{key}</CategoryTitle>
          <AllArticleContainer>
            {sortArticles[key].map((item) => (
              <RowContainer key={item.id}>
                <DateText>
                  {newDateToFormatString(
                    new Date(item.createTime.seconds * 1000)
                  )}
                </DateText>
                {!isCategory && (
                  <Link href={`/articles/tags/${item.tag}`}>
                    <TAG>{item.tag}</TAG>
                  </Link>
                )}

                <Link href={`/articles/${item.id}`}>
                  <Text>{item.title}</Text>
                </Link>
              </RowContainer>
            ))}
          </AllArticleContainer>
        </div>
      ))}
    </ColumnContainer>
  );
};

export default Block;
