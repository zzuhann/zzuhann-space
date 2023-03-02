import { useEffect, useRef, useState } from "react";
import { ColumnContainer } from "../../components/Container";
import Tiptap from "../../components/TipTapEditor";
import {
  getDataById,
  getFirestoreDataById,
  updateFirestoreById,
  uploadFirestore,
} from "../../common/firebaseFun";
import { Button, Tags, Title } from "../../components/addPosts/AddPosts";
import { Count } from "../../common/articleType";

const AddPost = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [context, setContext] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [tagArticlesCount, setTagArticlesCount] = useState<Count>();

  const updateTagCount = (tag: string) => {
    if (!tagArticlesCount) return;

    if (tagArticlesCount[tag] === undefined) {
      tagArticlesCount[tag] = 1;
    } else {
      tagArticlesCount[tag] += 1;
    }

    updateFirestoreById({
      target: "allTags",
      id: "tagArticlesCount",
      data: { count: tagArticlesCount },
    });
  };

  const onSubmit = () => {
    if (!titleRef.current) return;

    const title = titleRef.current.value;

    if (!title || !context) return;
    const articleInfo = {
      target: "articles",
      data: {
        title,
        content: context,
        createTime: new Date(),
        updateTime: new Date(),
        author: "zzuhann",
        tag: newOption,
      },
    };
    updateTagCount(newOption);
    uploadFirestore(articleInfo);
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
    const getTagArticlesCount = async () => {
      const response = await getDataById("allTags", "tagArticlesCount");
      setTagArticlesCount(response?.count);
    };
    getTagArticlesCount();
    getFirestoreDataById("allTags", "tags", undefined, setTags);
  }, []);

  return (
    <ColumnContainer>
      <Title titleRef={titleRef} />
      <Tags
        tags={tags}
        setTags={setTags}
        newOption={newOption}
        setNewOption={setNewOption}
      />
      <Tiptap context={context} setContext={setContext} />
      <Button onClick={onSubmit}>送出</Button>
    </ColumnContainer>
  );
};

export default AddPost;
