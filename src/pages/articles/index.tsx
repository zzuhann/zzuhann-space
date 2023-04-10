import { useEffect, useState } from 'react';
import { IArticleFirestore } from '@/common/articleType';
import { getCollection } from '@/common/firebaseFun';
import { SortArticleBlock } from '@/components/common/SortArticleBlock';
import { getLayout } from '@/layout';
import { LoadingScreen } from '@/components/common/Loading';

const Articles = () => {
  const [articles, setArticles] = useState<IArticleFirestore[]>();

  useEffect(() => {
    const getArticles = () => {
      const targetCollec = 'articles';
      getCollection(targetCollec, setArticles);
    };
    getArticles();
  }, []);
  if (!articles) return <LoadingScreen />;
  return (
    <>
      <SortArticleBlock articles={articles} isCategory={false} />
    </>
  );
};

Articles.getLayout = getLayout;

export default Articles;
