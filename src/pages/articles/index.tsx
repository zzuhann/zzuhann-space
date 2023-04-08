import { useEffect, useState } from "react";
import { IArticleFirestore } from "../../common/articleType";
import { getCollection } from "../../common/firebaseFun";
import { SortArticleBlock } from "../../components/SortArticleBlock";

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
      <SortArticleBlock articles={articles} isCategory={false} />
    </>
  );
};

export default Articles;
