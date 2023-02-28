import Link from "next/link";
import { useEffect, useState } from "react";
import { IArticleFirestore } from "../../common/articleType";
import { getCollection } from "../../common/firebaseFun";

export const Latest = () => {
  const [articles, setArticles] = useState<IArticleFirestore[]>();

  useEffect(() => {
    const getArticles = () => {
      const targetCollec = "articles";
      getCollection(targetCollec, setArticles);
    };
    getArticles();
  }, []);

  return (
    <>
      <h2>最新文章</h2>
      {articles?.slice(0.5).map((article) => (
        <Link key={article.id} href={`/articles/${article.id}`}>
          <div>{article.title}</div>
        </Link>
      ))}
      <Link href={"/articles"}>
        <div> {">>"} 查看所有文章</div>
      </Link>
    </>
  );
};
