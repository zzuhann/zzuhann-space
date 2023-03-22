import { IArticleFirestore } from "../../common/articleType";
import { newDateToFormatString } from "../../common/commonFun";
import { ColumnContainer, RowContainer } from "../Container";
import parse from "html-react-parser";
import Link from "next/link";
import styled from "styled-components";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { Button } from "../common/Common";

const ArticlePreviewContainer = styled(ColumnContainer)`
  border-bottom: 1px #b3b3b3 solid;
  margin-bottom: 55px;
  padding-bottom: 30px;
`;

const RowCenterContainer = styled(RowContainer)`
  align-items: center;
  margin-bottom: 12px;
`;

const ArticleTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
`;
const SubDescription = styled.div`
  font-size: 14px;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

const Context = styled.div`
  line-height: 1.8;
  margin-bottom: 30px;
`;

export const ArticleRead = ({
  article,
  isPreview,
}: {
  article: IArticleFirestore;
  isPreview: boolean;
}) => {
  return (
    <ArticlePreviewContainer>
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
