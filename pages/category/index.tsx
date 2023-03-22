import Link from "next/link";
import { useEffect, useState } from "react";
import { Count, IArticleFirestore } from "../../common/articleType";
import { getCollection, getDataById } from "../../common/firebaseFun";
import Block from "../../components/articles/Block";
import TagsCount from "../../components/articles/TagsCount";
import { RowContainer } from "../../components/Container";

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
      {/* <RowContainer>
        {Object.keys(tagsCount).map((key) => (
          <Link href={`/articles/tags/${key}`} key={key}>
            <RowContainer>
              <div>{key}</div>
              <div>{tagsCount[key]}</div>
            </RowContainer>
          </Link>
        ))}
      </RowContainer> */}
      <Block articles={articles} isCategory={true} />
    </>
  );
};

export default CategoryArticles;
