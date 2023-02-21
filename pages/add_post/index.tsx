import { useEffect, useRef, useState } from "react";
import { ColumnContainer } from "../../components/Container";
import Tiptap from "../../components/TipTapEditor";
import {
  getFirestoreDataById,
  updateFirestoreById,
  uploadFirestore,
} from "../../common/firebaseFun";
import { Button, Tags, Title } from "../../components/addPosts/AddPosts";

const AddPost = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [context, setContext] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");

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
