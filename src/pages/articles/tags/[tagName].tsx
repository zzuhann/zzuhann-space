import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IArticleFirestore } from "@/common/articleType";
import { getDataByWhere } from "@/common/firebaseFun";
import { SortArticleBlock } from "@/components/common/SortArticleBlock";
import { getLayout } from "@/layout";
import { Typography } from "@mui/material";

const TagArticlesList = () => {
  const router = useRouter();
  const { tagName } = router.query;
  const [articles, setArticles] = useState<IArticleFirestore[]>();

  useEffect(() => {
    if (!tagName) return;
    const targetCollec = "articles";
    const targetKey = "tag";
    const targetValue = tagName as string;
    getDataByWhere(targetCollec, targetKey, targetValue, setArticles);
  }, [tagName]);

  if (!articles) return;
  return (
    <>
      <Typography
        sx={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px" }}
      >
        {tagName}
      </Typography>
      <SortArticleBlock articles={articles} isCategory={false} />
    </>
  );
};
TagArticlesList.getLayout = getLayout;

export default TagArticlesList;
