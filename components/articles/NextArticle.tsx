import Link from "next/link";
import { RowContainer } from "../Container";
import { Text } from "../common/Common";
import styled from "styled-components";

const NextContainer = styled(RowContainer)`
  justify-content: space-between;
`;

const NextArticle = () => {
  return (
    <NextContainer style={{ justifyContent: "space-between" }}>
      <Link href={"/"}>
        <Text>{"<< "}上一篇文章</Text>
      </Link>
      <Link href={"/"}>
        <Text>下一篇文章{" >>"}</Text>
      </Link>
    </NextContainer>
  );
};

export default NextArticle;
