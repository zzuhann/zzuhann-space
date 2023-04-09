import { IArticleFirestore } from "../../common/articleType";
import { newDateToFormatString } from "../../common/commonFun";
import parse from "html-react-parser";
import Link from "next/link";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { Button } from "../common/Common";
import {
  ArticlePreviewContainer,
  ArticleTitle,
  Context,
  RowCenterContainer,
  SubDescription,
} from "./ArticleRead.style";

export const ArticleRead = ({
  article,
  isPreview,
  isLast,
}: {
  article: IArticleFirestore;
  isPreview: boolean;
  isLast: boolean;
}) => {
  return (
    <ArticlePreviewContainer isLast={isLast}>
      <ArticleTitle>{article.title}</ArticleTitle>
      <RowCenterContainer>
        <SubDescription>
          發佈於{" "}
          {newDateToFormatString(new Date(article.createTime.seconds * 1000))}
        </SubDescription>
        <Link href={`/articles/tags/${article.tag}`}>
          <SubDescription>
            <LocalOfferOutlinedIcon
              fontSize="medium"
              sx={{ marginRight: "5px" }}
            />{" "}
            {article.tag}
          </SubDescription>
        </Link>
      </RowCenterContainer>

      <Context>{parse(article.description)}</Context>
      {isPreview && (
        <Link
          href={`/articles/${article.id}`}
          style={{ alignSelf: "flex-end" }}
        >
          <Button>繼續閱讀</Button>
        </Link>
      )}
    </ArticlePreviewContainer>
  );
};