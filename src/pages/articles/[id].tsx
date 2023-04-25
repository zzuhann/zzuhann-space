import { IArticleFirestore, IArticleSSG } from '@/common/articleType';
import { getDataById } from '@/common/firebaseFun';
import { ArticleRead } from '@/components/ArticleRead';
import { getLayout } from '@/layout';
import Head from 'next/head';
import { GetStaticProps } from 'next';

type TProps = {
  sortArticle: IArticleFirestore;
  description: string;
};

const SingleArticle = ({ sortArticle, description }: TProps) => {
  return (
    <>
      <Head>
        <title>{sortArticle.title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={sortArticle.description} />
        <meta property="og:title" content={sortArticle.title} />
        <meta property="og:description" content={description} />
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

  const html = sortArticle.description; // 這裡是取得 HTML 字串的部分
  const regex = /<p>(.*?)<\/p>/g;
  const matches = html.matchAll(regex);
  const description = Array.from(matches, (match) => match[1]).join(' ');

  return {
    props: {
      sortArticle,
      description,
    },
    revalidate: 100,
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
