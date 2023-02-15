import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IArticleFirestore } from "../../../../common/articleType";
import { getDataById } from "../../../../common/firebaseFun";
import { Button, Tags, Title } from "../../../../components/addPosts/AddPosts";
import { ColumnContainer } from "../../../../components/Container";
import Tiptap from "../../../../components/TipTapEditor";

const EditArticle = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [articleDetail, setArticleDetail] = useState<IArticleFirestore>();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getArticleInfo = () => {
      const collection = "articles";
      const response = getDataById(collection, postId as string);
      response.then((res) => setArticleDetail(res as IArticleFirestore));
    };
    if (postId) {
      getArticleInfo();
    }
  }, [postId]);

  useEffect(() => {
    if (titleRef.current && articleDetail) {
      titleRef.current.value = articleDetail.title;
    }
  }, [articleDetail]);
  return (
    // <h1>home</h1>
    <ColumnContainer>
      <Title titleRef={titleRef} />
      {/* <Tags
        tags={tags}
        setTags={setTags}
        allOptions={allOptions}
        setAllOptions={setAllOptions}
      />
      <Tiptap context={context} setContext={setContext} />
      <Button onClick={onSubmit}>送出</Button> */}
    </ColumnContainer>
  );
};

export default EditArticle;
