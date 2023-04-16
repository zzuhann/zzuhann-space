import { IArticleFirestore } from '@/common/articleType';
import { getCollection } from '@/common/firebaseFun';
import { SortArticleBlock } from '@/components/SortArticleBlock';
import { getLayout } from '@/layout';
import { GetStaticProps } from 'next';

const Articles = (allArticles: IArticleFirestore[]) => {
  return <SortArticleBlock articles={allArticles} isCategory={false} />;
};

Articles.getLayout = getLayout;

export default Articles;

export const getStaticProps: GetStaticProps = async () => {
  const allArticles = await getCollection<IArticleFirestore>('articles');

  return {
    props: {
      allArticles,
    },
  };
};
