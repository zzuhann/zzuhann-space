import { IArticleFirestore, IArticleSSG } from '@/common/articleType';
import { getDataById } from '@/common/firebaseFun';
import { ArticleRead } from '@/components/ArticleRead';
import { getLayout } from '@/layout';
import Head from 'next/head';
import { GetStaticProps } from 'next';

type TProps = {
  sortArticle: IArticleFirestore;
};

const SingleArticle = ({ sortArticle }: TProps) => {
  return (
    <>
      <Head>
        <title>{sortArticle.title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={sortArticle.description} />
        <meta property="og:title" content={sortArticle.title} />
        <meta property="og:description" content={sortArticle.description} />
      </Head>
      <ArticleRead article={sortArticle} isPreview={false} isLast={false} />
      {/* <NextArticle /> */}
    </>
  );
};

SingleArticle.getLayout = getLayout;

export default SingleArticle;

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const getArticle = async () => {
    if (typeof id !== 'string') return null;

    const targetCollec = 'articles';
    return await getDataById<IArticleSSG>(targetCollec, id);
  };
  const article = await getArticle();
  const { createTime, updateTime } = article as IArticleSSG;

  let sortArticle: IArticleFirestore = JSON.parse(JSON.stringify(article));

  sortArticle = {
    ...sortArticle,
    createTime: createTime.toDate().toISOString() as string,
    updateTime: updateTime.toDate().toISOString() as string,
  };

  return {
    props: {
      sortArticle,
    },
    revalidate: 1000,
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
