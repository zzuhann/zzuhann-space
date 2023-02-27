import { useEffect, useState } from "react";
import { RowContainer } from "../Container";
import { getDataById } from "../../common/firebaseFun";
import Link from "next/link";

type Count = {
  [key: string]: number;
};

export const Category = () => {
  const [tagsCount, setTagsCount] = useState<Count>();
  useEffect(() => {
    const getTagsCount = async () => {
      const targetCollection = "allTags";
      const targetId = "tagArticlesCount";
      const response = await getDataById(targetCollection, targetId);
      setTagsCount(response?.count);
    };
    getTagsCount();
  }, []);

  if (!tagsCount) return null;
  return (
    <>
      <h2>分類</h2>
      {Object.keys(tagsCount).map((key) => (
        <Link href={`/articles/tags/${key}`} key={key}>
          <RowContainer>
            <div>{key}</div>
            <div>{tagsCount[key]}</div>
          </RowContainer>
        </Link>
      ))}
    </>
  );
};
