import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ColumnContainer, RowContainer } from "../../components/Container";
import Tiptap from "../../components/TipTapEditor";
import styled from "styled-components";
import {
  getFirestoreDataById,
  updateFirestoreById,
  uploadFirestore,
  uploadStorageImage,
} from "../../common/firebaseFun";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const Title = ({ titleRef }: { titleRef: RefObject<HTMLInputElement> }) => {
  return (
    <RowContainer>
      <label htmlFor="title">標題</label>
      <input id="title" type="text" name="title" ref={titleRef} />
    </RowContainer>
  );
};

const Tags = ({
  tags,
  setTags,
  allOptions,
  setAllOptions,
}: {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  allOptions: string[];
  setAllOptions: Dispatch<SetStateAction<string[]>>;
}) => {
  const [newOption, setNewOption] = useState("");

  const handleInputChange = (event: any, newValue: string) => {
    setNewOption(newValue);
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      value={allOptions}
      options={tags}
      onChange={(event, newValue) => {
        if (newValue.length > tags.length) {
          setTags([...newValue]);
        }
        setAllOptions([...newValue]);
      }}
      onInputChange={handleInputChange}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} key={index} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Options"
          onBlur={() => {
            if (newOption.length === 0) return;

            setAllOptions([...allOptions, newOption]);
            setNewOption("");
          }}
        />
      )}
    />
  );
};

const Button = styled.div`
  border: solid 1px black;
`;

const AddPost = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [context, setContext] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [allOptions, setAllOptions] = useState(tags);

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
        tag: allOptions,
      },
    };
    uploadFirestore(articleInfo);
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
      <Tiptap context={context} setContext={setContext} />
      <Button onClick={onSubmit}>送出</Button>
    </ColumnContainer>
  );
};

export default AddPost;
