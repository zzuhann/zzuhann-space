import Link from "next/link";
import { useEffect, useState } from "react";
import { Count, IArticleFirestore } from "../../common/articleType";
import { getCollection, getDataById } from "../../common/firebaseFun";
import Block from "../../components/articles/Block";
import { RowContainer } from "../../components/Container";

type SORT_ARTICLES = {
  [key: string]: IArticleFirestore[];
};

const CategoryArticles = () => {
  const [articles, setArticles] = useState<IArticleFirestore[]>();
  const [articlesByTag, setArticlesByTag] = useState<SORT_ARTICLES>();
  const [tagsCount, setTagsCount] = useState<Count>();

  useEffect(() => {
    const getArticles = () => {
      const targetCollec = "articles";
      getCollection(targetCollec, setArticles);
    };
    getArticles();

    const getTagsCount = async () => {
      const targetCollection = "allTags";
      const targetId = "tagArticlesCount";
      const response = await getDataById(targetCollection, targetId);
      setTagsCount(response?.count);
    };
    getTagsCount();
  }, []);

  useEffect(() => {
    if (!articles) return;
    const sortArticlesByTags = () => {
      const result: SORT_ARTICLES = articles.reduce(
        (acc: SORT_ARTICLES, cur) => {
          if (!acc[cur.tag]) {
            acc[cur.tag] = [];
          }
          acc[cur.tag].push({
            id: cur.id,
            title: cur.title,
            createTime: cur.createTime,
            updateTime: cur.updateTime,
            author: cur.author,
            tag: cur.tag,
            content: cur.content,
          });
          return acc;
        },
        {}
      );
      setArticlesByTag(result);
    };
    sortArticlesByTags();
  }, [articles]);

  if (!articlesByTag) return null;
  if (!tagsCount) return null;
  return (
    <>
      <RowContainer>
        {Object.keys(tagsCount).map((key) => (
          <Link href={`/articles/tags/${key}`} key={key}>
            <RowContainer>
              <div>{key}</div>
              <div>{tagsCount[key]}</div>
            </RowContainer>
          </Link>
        ))}
      </RowContainer>
      {Object.keys(articlesByTag).map((key) => (
        <div key={key}>
          <h2>{key}</h2>
          <Block articles={articlesByTag[key]} isCategory={true} />
        </div>
      ))}
    </>
  );
};

export default CategoryArticles;
