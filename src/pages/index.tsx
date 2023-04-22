import { Home } from '@/features/home';
import { getLayout } from '@/layout';
import { NextPageWithLayout } from './_app';
import { getCollection } from '@/common/firebaseFun';
import { IArticleFirestore, IArticleSSG } from '@/common/articleType';
import { GetStaticProps } from 'next';

type TProps = NextPageWithLayout & {
  sortArticles: IArticleFirestore[];
};

const Page = ({ sortArticles }: TProps) => {
  return <Home allArticles={sortArticles} />;
};

Page.getLayout = getLayout;

export default Page;

export const getStaticProps: GetStaticProps = async () => {
  const allArticles = await getCollection<IArticleSSG>('articles');
  const sortArticles = allArticles.map((item) => {
    const createTime = item.createTime.toDate().toISOString();
    const updateTime = item.updateTime.toDate().toISOString();

    return {
      ...item,
      createTime,
      updateTime,
    };
  });
  return {
    props: {
      sortArticles,
    },
    revalidate: 100,
  };
};
