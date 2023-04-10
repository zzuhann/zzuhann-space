import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IArticleFirestore } from '@/common/articleType';
import { getDataById } from '@/common/firebaseFun';
import { ArticleRead } from '@/components/common/ArticleRead';
import { getLayout } from '@/layout';
import Head from 'next/head';
import { LoadingScreen } from '@/components/common/Loading';

const SingleArticle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<IArticleFirestore>();

  useEffect(() => {
    if (!id) return;
    const getArticle = () => {
      const targetCollec = 'articles';
      getDataById(targetCollec, id as string).then((res) => setArticle(res as IArticleFirestore));
    };
    getArticle();
  }, [id]);

  if (!article) return <LoadingScreen />;
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <ArticleRead article={article} isPreview={false} isLast={false} />
      {/* <NextArticle /> */}
    </>
  );
};

SingleArticle.getLayout = getLayout;

export default SingleArticle;
