import { useEffect, useState } from 'react';
import { Count, IArticleFirestore } from '@/common/articleType';
import { getCollection, getDataById } from '@/common/firebaseFun';
import { SortArticleBlock } from '@/components/SortArticleBlock';
import { TagsCount } from '@/components/TagsCount';
import { getLayout } from '@/layout';
import { LoadingScreen } from '@/components/Loading';

const CategoryArticles = () => {
  const [articles, setArticles] = useState<IArticleFirestore[]>();
  const [tagsCount, setTagsCount] = useState<Count>();

  useEffect(() => {
    const getArticles = async () => {
      const targetCollec = 'articles';
      const response = await getCollection(targetCollec);
      setArticles(response as IArticleFirestore[]);
    };
    getArticles();

    const getTagsCount = async () => {
      const targetCollection = 'allTags';
      const targetId = 'tagArticlesCount';
      const response = await getDataById<{ count: Count }>(targetCollection, targetId);
      setTagsCount(response?.count);
    };
    getTagsCount();
  }, []);

  if (!articles) return <LoadingScreen />;
  if (!tagsCount) return <LoadingScreen />;
  return (
    <>
      <TagsCount tagsCount={tagsCount} />
      <SortArticleBlock articles={articles} isCategory={true} />
    </>
  );
};

CategoryArticles.getLayout = getLayout;

export default CategoryArticles;
