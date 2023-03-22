import { useEffect, useState } from "react";
import { RowContainer } from "../Container";
import { getDataById } from "../../common/firebaseFun";
import Link from "next/link";
import { Count } from "../../common/articleType";
import { SidebarText, SidebarTitle } from "./Sidebar.style";
import styled from "styled-components";

const TagContainer = styled(RowContainer)`
  align-items: center;
  gap: 8px;
`;

const NumTag = styled.div`
  border-radius: 5px;
  background-color: #20538f;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #fff;
`;

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
