import Link from "next/link";
import { Text } from "../../common/Common";
import { NextContainer } from "./NextArticle.style";

const NextArticle = () => {
  return (
    <NextContainer>
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
