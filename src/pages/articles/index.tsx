import { IArticleFirestore, IArticleSSG } from '@/common/articleType';
import { getCollection } from '@/common/firebaseFun';
import { SortArticleBlock } from '@/components/SortArticleBlock';
import { getLayout } from '@/layout';
import { GetStaticProps } from 'next';

type TProps = {
  sortArticles: IArticleFirestore[];
};

const Articles = ({ sortArticles }: TProps) => {
  return <SortArticleBlock articles={sortArticles} isCategory={false} />;
};

Articles.getLayout = getLayout;

export default Articles;

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
  };
};
