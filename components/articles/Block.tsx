import Link from "next/link";
import styled from "styled-components";
import { IArticleFirestore } from "../../common/articleType";
import { newDateToFormatString } from "../../common/commonFun";
import { ColumnContainer } from "../Container";

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const H1 = styled.h1`
  font-size: 16px;
`;

const Text = styled.p``;

const TAG = styled.div`
  background-color: #3c3c3c;
  color: #fff;
  border-radius: 3px;
  padding: 5px;
  font-size: 16px;
`;

type Props = {
  articles: IArticleFirestore[];
  isCategory: boolean;
};

const Block = ({ articles, isCategory }: Props) => {
  return (
    <ColumnContainer>
      {articles.map((item) => (
        <RowContainer key={item.id}>
          <Text>
            {newDateToFormatString(new Date(item.createTime.seconds * 1000))}
          </Text>
          {!isCategory && (
            <Link href={`/articles/tags/${item.tag}`}>
              <TAG>{item.tag}</TAG>
            </Link>
          )}

          <Link href={`/articles/${item.id}`}>
            <H1>{item.title}</H1>
          </Link>
        </RowContainer>
      ))}
    </ColumnContainer>
  );
};

export default Block;
