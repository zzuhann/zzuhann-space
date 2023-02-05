import { RefObject, useRef, useState } from "react";
import { ColumnContainer, RowContainer } from "../../components/Container";
import Tiptap from "../../components/TipTapEditor";
import styled from "styled-components";
import { uploadFirestore, uploadStorageImage } from "../../common/firebaseFun";

const Title = ({ titleRef }: { titleRef: RefObject<HTMLInputElement> }) => {
  return (
    <RowContainer>
      <label htmlFor="title">標題</label>
      <input id="title" type="text" name="title" ref={titleRef} />
    </RowContainer>
  );
};

const Cover = ({ coverRef }: { coverRef: RefObject<HTMLInputElement> }) => {
  return (
    <RowContainer>
      <label htmlFor="cover">封面</label>
      <input id="cover" type="file" accept="image/*" ref={coverRef} />
    </RowContainer>
  );
};

const Button = styled.div`
  border: solid 1px black;
`;

const AddPost = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const [context, setContext] = useState<string>("");

  const onSubmit = () => {
    if (!titleRef.current || !coverRef.current) return;

    const title = titleRef.current.value;
    const coverFiles = coverRef.current.files;

    if (coverFiles) {
      if (!title || coverFiles.length === 0 || !context) return;
      const cover = coverFiles[0];
      const articleInfo = {
        target: "articles",
        data: {
          title,
          content: context,
          createTime: new Date(),
          updateTime: new Date(),
          author: "zzuhann",
          tag: ["notyet"],
        },
      };
      uploadStorageImage(cover.name, cover, undefined, true, articleInfo);
    }
  };

  return (
    <ColumnContainer>
      <Title titleRef={titleRef} />
      <Cover coverRef={coverRef} />
      <Tiptap context={context} setContext={setContext} />
      <Button onClick={onSubmit}>送出</Button>
    </ColumnContainer>
  );
};

export default AddPost;
