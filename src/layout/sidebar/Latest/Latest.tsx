import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IArticleFirestore } from '../../../common/articleType';
import { getCollection } from '../../../common/firebaseFun';
import { Button } from '../../../components/common/Common';
import { SidebarSingleContainer, SidebarText, SidebarTitle } from '../Sidebar.style';

export const Latest = () => {
  const [articles, setArticles] = useState<IArticleFirestore[]>();

  useEffect(() => {
    const getArticles = async () => {
      const targetCollec = 'articles';
      const response = await getCollection<IArticleFirestore>(targetCollec);
      if (response) {
        setArticles(response);
      }
    };

    getArticles();
  }, []);

  return (
    <SidebarSingleContainer>
      <SidebarTitle>最新文章</SidebarTitle>
      {articles?.slice(0, 5).map((article) => (
        <Link key={article.id} href={`/articles/${article.id}`}>
          <SidebarText>{article.title}</SidebarText>
        </Link>
      ))}
      <Link href={'/articles'} style={{ alignSelf: 'center', marginTop: '10px' }}>
        <Button>查看所有文章</Button>
      </Link>
    </SidebarSingleContainer>
  );
};
