import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IArticleFirestore } from "../../common/articleType";
import { getDataById } from "../../common/firebaseFun";
import { ArticleRead } from "../../components/articles/ArticleRead";
import NextArticle from "../../components/articles/NextArticle";

const SingleArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<IArticleFirestore>();

  useEffect(() => {
    if (!id) return;
    const getArticle = () => {
      const targetCollec = "articles";
      getDataById(targetCollec, id as string).then((res) =>
        setArticle(res as IArticleFirestore)
      );
    };
    getArticle();
  }, [id]);

  if (!article) return;
  return (
    <>
      <ArticleRead article={article} isPreview={false} />
      <NextArticle />
    </>
  );
};

export default SingleArticle;
