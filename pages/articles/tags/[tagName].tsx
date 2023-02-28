import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IArticleFirestore } from "../../../common/articleType";
import { getDataByWhere } from "../../../common/firebaseFun";
import Block from "../../../components/articles/Block";

const TagArticlesList = () => {
  const router = useRouter();
  const { tagName } = router.query;
  const [articles, setArticles] = useState<IArticleFirestore[]>();

  useEffect(() => {
    if (!tagName) return;
    const targetCollec = "articles";
    const targetKey = "tag";
    const targetValue = tagName as string;
    getDataByWhere(targetCollec, targetKey, targetValue, setArticles);
  }, [tagName]);

  if (!articles) return;
  return (
    <>
      <h1>{tagName}</h1>
      <Block articles={articles} isCategory={false} />
    </>
  );
};

export default TagArticlesList;
