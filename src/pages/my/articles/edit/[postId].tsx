import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Count, IArticle } from "../../../../common/articleType";
import {
  getDataById,
  getFirestoreDataById,
  updateFirestoreById,
} from "../../../../common/firebaseFun";
import { Tags, Title } from "../../../../components/addPosts/AddPosts";
import { Button, Title32px } from "../../../../components/common/Common";
import Tiptap from "../../../../components/TipTapEditor/TipTapEditor";
import { Stack } from "@mui/material";

const EditArticle = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [articleDetail, setArticleDetail] = useState<IArticle>();
  const [tags, setTags] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [tagArticlesCount, setTagArticlesCount] = useState<Count>();

  const updateTagCount = (tag: string) => {
    if (!tagArticlesCount) return;
    if (!articleDetail) return;

    if (articleDetail.tag === tag) return;

    const newCount = { ...tagArticlesCount };

    if (tagArticlesCount[tag] === undefined) {
      newCount[tag] = 1;
    } else {
      newCount[tag] += 1;
    }
    newCount[articleDetail.tag] -= 1;
    if (newCount[articleDetail.tag] === 0) {
      delete newCount[articleDetail.tag];
    }

    updateFirestoreById({
      target: "allTags",
      id: "tagArticlesCount",
      data: { count: newCount },
    });
  };

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
      tag: newOption,
    };
    updateTagCount(newOption);
    updateFirestoreById({ target, id: id as string, data: newArticle });
    updateFirestoreById({
      target: "allTags",
      id: "tags",
      data: { tags: tags },
    });
    clear();
  };

  const clear = () => {
    if (titleRef.current) {
      titleRef.current.value = "";
    }
    setNewOption("");
    setContext("");
  };

  useEffect(() => {
    const getArticleInfo = () => {
      const collection = "articles";
      const response = getDataById(collection, postId as string);
      response.then((res) => {
        const articleInfo = res as IArticle;
        setArticleDetail(articleInfo);
        setNewOption(articleInfo.tag);
        setContext(articleInfo.content);
        setDescription(articleInfo.description);
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
    const getTagArticlesCount = async () => {
      const response = await getDataById("allTags", "tagArticlesCount");
      setTagArticlesCount(response?.count);
    };
    getTagArticlesCount();
    getFirestoreDataById("allTags", "tags", undefined, setTags);
  }, []);

  return (
    <Stack direction="column">
      <Title32px>編輯文章</Title32px>
      <Title titleRef={titleRef} />
      <Tags
        tags={tags}
        setTags={setTags}
        newOption={newOption}
        setNewOption={setNewOption}
        defaultTag={articleDetail?.tag}
      />
      {description && (
        <Tiptap
          context={context}
          setContext={setContext}
          type={"description"}
        />
      )}
      {context && (
        <Tiptap context={context} setContext={setContext} type={"context"} />
      )}
      <Button onClick={onSubmit} style={{ alignSelf: "flex-start" }}>
        送出
      </Button>
    </Stack>
  );
};

export default EditArticle;
