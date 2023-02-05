import { useState } from "react";
import { ColumnContainer, RowContainer } from "../../components/Container";
import Tiptap from "../../components/TipTapEditor";
import styled from "styled-components";

const Title = () => {
  return (
    <RowContainer>
      <label htmlFor="title">標題</label>
      <input id="title" type="text" name="title" />
    </RowContainer>
  );
};

const Cover = () => {
  return (
    <RowContainer>
      <label htmlFor="cover">封面</label>
      <input id="cover" type="file" accept="image/*" />
    </RowContainer>
  );
};

const Button = styled.div`
  border: solid 1px black;
`;

const AddPost = () => {
  const [context, setContext] = useState("");

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <ColumnContainer>
      <Title />
      <Cover />
      <Tiptap setContext={setContext} />
      <Button>送出</Button>
    </ColumnContainer>
  );
};

export default AddPost;
