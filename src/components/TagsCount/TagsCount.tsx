import Link from "next/link";
import { Count } from "../../common/articleType";
import {
  AllCountContainer,
  CountContainer,
  TagCountContainer,
  TagName,
} from "./TagsCount.style";

export const TagsCount = ({ tagsCount }: { tagsCount: Count }) => {
  return (
    <>
      <AllCountContainer>
        {Object.keys(tagsCount).map((key) => (
          <Link href={`/articles/tags/${key}`} key={key}>
            <TagCountContainer>
              <TagName>{key}</TagName>
              <CountContainer>{tagsCount[key]}</CountContainer>
            </TagCountContainer>
          </Link>
        ))}
      </AllCountContainer>
    </>
  );
};
