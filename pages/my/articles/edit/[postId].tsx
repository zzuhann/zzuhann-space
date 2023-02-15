import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IArticle } from "../../../../common/articleType";
import {
  getDataById,
  getFirestoreDataById,
  updateFirestoreById,
} from "../../../../common/firebaseFun";
import { Button, Tags, Title } from "../../../../components/addPosts/AddPosts";
import { ColumnContainer } from "../../../../components/Container";
import Tiptap from "../../../../components/TipTapEditor";

const EditArticle = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [articleDetail, setArticleDetail] = useState<IArticle>();
  const [tags, setTags] = useState<string[]>([]);
  const [allOptions, setAllOptions] = useState<string[]>(tags);
  const [context, setContext] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const newTitle = titleRef.current?.value;
    const target = "articles";
    const id = postId;
    if (!newTitle) return;
    if (!articleDetail) return;
    const newArticle: IArticle = {
      ...articleDetail,
      content: context,
      title: newTitle,
      updateTime: new Date(),
      tag: allOptions,
    };
    updateFirestoreById({ target, id: id as string, data: newArticle });
    updateFirestoreById({
      target: "allTags",
      id: "tags",
      data: { tags: allOptions },
    });
    clear();
  };

  const clear = () => {
    if (titleRef.current) {
      titleRef.current.value = "";
    }
    setAllOptions([]);
    setContext("");
  };

  useEffect(() => {
    const getArticleInfo = () => {
      const collection = "articles";
      const response = getDataById(collection, postId as string);
      response.then((res) => {
        const articleInfo = res as IArticle;
        setArticleDetail(articleInfo);
        setAllOptions(articleInfo.tag);
        setContext(articleInfo.content);
      });
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

  useEffect(() => {
    getFirestoreDataById("allTags", "tags", undefined, setTags);
  }, []);

  return (
    <ColumnContainer>
      <Title titleRef={titleRef} />
      <Tags
        tags={tags}
        setTags={setTags}
        allOptions={allOptions}
        setAllOptions={setAllOptions}
      />
      {context && <Tiptap context={context} setContext={setContext} />}
      <Button onClick={onSubmit}>送出</Button>
    </ColumnContainer>
  );
};

export default EditArticle;
