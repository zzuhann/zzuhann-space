import { useEffect, useState } from 'react';
import { getDataById } from '../../../common/firebaseFun';
import Link from 'next/link';
import { Count } from '../../../common/articleType';
import { SidebarText, SidebarTitle } from '../Sidebar.style';
import { NumTag, TagContainer } from './Category.style';

export const Category = () => {
  const [tagsCount, setTagsCount] = useState<Count>();
  useEffect(() => {
    const getTagsCount = async () => {
      const targetCollection = 'allTags';
      const targetId = 'tagArticlesCount';
      const response = await getDataById<{ count: Count }>(targetCollection, targetId);
      if (response) {
        setTagsCount(response?.count);
      }
    };
    getTagsCount();
  }, []);

  if (!tagsCount) return null;
  return (
    <>
      <SidebarTitle>分類</SidebarTitle>
      {Object.keys(tagsCount).map((key) => (
        <Link href={`/articles/tags/${key}`} key={key}>
          <TagContainer>
            <SidebarText>{key}</SidebarText>
            <NumTag>{tagsCount[key]}</NumTag>
          </TagContainer>
        </Link>
      ))}
    </>
  );
};
