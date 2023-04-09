import { useEffect, useState } from "react";
import { Count, IArticleFirestore } from "../../common/articleType";
import { getCollection, getDataById } from "../../common/firebaseFun";
import { SortArticleBlock } from "../../components/SortArticleBlock";
import { TagsCount } from "../../components/TagsCount";
import { getLayout } from "../../layout";

const CategoryArticles = () => {
  const [articles, setArticles] = useState<IArticleFirestore[]>();
  const [tagsCount, setTagsCount] = useState<Count>();

  useEffect(() => {
    const getArticles = () => {
      const targetCollec = "articles";
      getCollection(targetCollec, setArticles);
    };
    getArticles();

    const getTagsCount = async () => {
      const targetCollection = "allTags";
      const targetId = "tagArticlesCount";
      const response = await getDataById(targetCollection, targetId);
      setTagsCount(response?.count);
    };
    getTagsCount();
  }, []);

  if (!articles) return null;
  if (!tagsCount) return null;
  return (
    <>
      <TagsCount tagsCount={tagsCount} />
      <SortArticleBlock articles={articles} isCategory={true} />
    </>
  );
};

CategoryArticles.getLayout = getLayout;

export default CategoryArticles;
