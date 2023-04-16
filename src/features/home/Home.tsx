import { IArticleFirestore } from '@/common/articleType';
import { ArticleRead } from '@/components/ArticleRead';

type TProps = {
  allArticles: IArticleFirestore[];
};
export function Home({ allArticles }: TProps) {
  return (
    <>
      {allArticles?.map((article, index) => (
        <ArticleRead key={article.id} article={article} isPreview={true} isLast={index === allArticles.length - 1} />
      ))}
    </>
  );
}
