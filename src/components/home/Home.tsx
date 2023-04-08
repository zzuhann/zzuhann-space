import { useEffect, useState } from "react";
import { IArticleFirestore } from "../../common/articleType";
import { getCollection } from "../../common/firebaseFun";
import { ArticleRead } from "../ArticleRead";

export default function Home() {
  const [allArticles, setAllArticles] = useState<IArticleFirestore[]>();

  useEffect(() => {
    const getArticles = () => {
      const targetCollec = "articles";
      getCollection(targetCollec, setAllArticles);
    };
    getArticles();
  }, []);
  return (
    <>
      {allArticles?.map((article, index) => (
        <ArticleRead
          key={article.id}
          article={article}
          isPreview={true}
          isLast={index === allArticles.length - 1}
        />
      ))}
    </>
  );
}
