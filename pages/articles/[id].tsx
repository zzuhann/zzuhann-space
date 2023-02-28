import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { IArticleFirestore } from "../../common/articleType";
import { newDateToFormatString } from "../../common/commonFun";
import { getDataById } from "../../common/firebaseFun";
import Link from "next/link";

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
      <h1>{article.title}</h1>
      <div>
        {newDateToFormatString(new Date(article.createTime.seconds * 1000))}
      </div>
      <Link href={`/articles/tags/${article.tag}`}>
        <div>{article.tag}</div>
      </Link>
      <div>{parse(article.content)}</div>
    </>
  );
};

export default SingleArticle;
