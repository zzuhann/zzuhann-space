import Link from "next/link";
import { useMemo } from "react";
import { IArticleFirestore } from "@/common/articleType";
import { newDateToFormatString } from "@/common/commonFun";
import {
  AllArticleContainer,
  CategoryTitle,
  DateText,
  RowContainer,
  TAG,
  Text,
} from "./SortArticleBlock.style";
import { Stack } from "@mui/material";

type Props = {
  articles: IArticleFirestore[];
  isCategory: boolean;
};

export const SortArticleBlock = ({ articles, isCategory }: Props) => {
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
    <Stack direction="column">
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
    </Stack>
  );
};
