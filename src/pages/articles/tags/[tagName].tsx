import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IArticleFirestore, IArticleSSG } from '@/common/articleType';
import { getDataByWhere } from '@/common/firebaseFun';
import { SortArticleBlock } from '@/components/SortArticleBlock';
import { getLayout } from '@/layout';
import { Typography } from '@mui/material';
import { LoadingScreen } from '@/components/Loading';

const TagArticlesList = () => {
  const router = useRouter();
  const { tagName } = router.query;
  const [articles, setArticles] = useState<IArticleFirestore[]>();

  useEffect(() => {
    if (!tagName) return;
    const targetCollec = 'articles';
    const targetKey = 'tag';
    const targetValue = tagName as string;
    const getData = async () => {
      const data = await getDataByWhere(targetCollec, targetKey, targetValue);
      const newArticles = (data as IArticleSSG[]).map((item) => {
        const createTime = item.createTime.toDate().toISOString();
        const updateTime = item.updateTime.toDate().toISOString();
        return {
          ...item,
          createTime,
          updateTime,
        };
      });
      setArticles(newArticles);
    };
    getData();
  }, [tagName]);

  if (!articles) return <LoadingScreen />;
  return (
    <>
      <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>{tagName}</Typography>
      <SortArticleBlock articles={articles} isCategory={false} />
    </>
  );
};
TagArticlesList.getLayout = getLayout;

export default TagArticlesList;
