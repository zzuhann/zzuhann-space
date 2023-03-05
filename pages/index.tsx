import { useEffect, useState } from "react";
import { IArticleFirestore } from "../common/articleType";
import { getCollection } from "../common/firebaseFun";
import { ArticlePreview } from "../components/articles/ArticlePreview";

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
      {allArticles?.map((article) => (
        <ArticlePreview key={article.id} article={article} />
      ))}
    </>
  );
}
