import { useEffect, useState } from "react";
import { IArticleFirestore } from "../../common/articleType";
import { getCollection } from "../../common/firebaseFun";
import Block from "../../components/articles/Block";

const Articles = () => {
  const [articles, setArticles] = useState<IArticleFirestore[]>();

  useEffect(() => {
    const getArticles = () => {
      const targetCollec = "articles";
      getCollection(targetCollec, setArticles);
    };
    getArticles();
  }, []);
  if (!articles) return null;
  return (
    <>
      <Block articles={articles} isCategory={false} />
    </>
  );
};

export default Articles;
