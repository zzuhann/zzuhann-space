import { IArticleFirestore } from "../../common/articleType";
import { newDateToFormatString } from "../../common/commonFun";
import { ColumnContainer } from "../Container";
import parse from "html-react-parser";
import Link from "next/link";

export const ArticlePreview = ({ article }: { article: IArticleFirestore }) => {
  return (
    <ColumnContainer>
      <h1>{article.title}</h1>
      <div>
        {newDateToFormatString(new Date(article.createTime.seconds * 1000))}
      </div>
      <div>{parse(article.description)}</div>
      <Link href={`/articles/${article.id}`} style={{ alignSelf: "flex-end" }}>
        <div>{">>"}查看完整文章</div>
      </Link>
    </ColumnContainer>
  );
};
