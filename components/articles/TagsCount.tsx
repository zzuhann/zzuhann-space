import Link from "next/link";
import styled from "styled-components";
import { Count } from "../../common/articleType";
import { RowContainer } from "../Container";

const AllCountContainer = styled(RowContainer)`
  gap: 15px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #b3b3b3;
`;

const TagCountContainer = styled(RowContainer)`
  border-radius: 5px;
  background-color: #20538f;
  padding: 5px 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const TagName = styled.div`
  color: #fff;
  letter-spacing: 0.5px;
`;

const CountContainer = styled.div`
  border-radius: 3px;
  background-color: #fff;
  padding: 1px 6px;
  color: #20538f;
  min-width: 30px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

const TagsCount = ({ tagsCount }: { tagsCount: Count }) => {
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

export default TagsCount;
