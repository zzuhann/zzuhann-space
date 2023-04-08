import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { InputContainer, Label, TextInput } from "./AddPosts.style";
import { Count } from "../../common/articleType";
import {
  getDataById,
  getFirestoreDataById,
  updateFirestoreById,
  uploadFirestore,
} from "../../common/firebaseFun";
import Tiptap from "../TipTapEditor/TipTapEditor";
import { Button } from "../common/Common";

export const Title = ({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) => {
  return (
    <InputContainer>
      <Label htmlFor="title">標題</Label>
      <TextInput id="title" type="text" name="title" ref={titleRef} />
    </InputContainer>
  );
};

export const Tags = ({
  tags,
  setTags,
  newOption,
  setNewOption,
}: {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  newOption: string;
  setNewOption: Dispatch<SetStateAction<string>>;
  defaultTag?: string;
}) => {
  const handleInputChange = (event: any, newValue: string) => {
    setNewOption(newValue);
  };

  return (
    <InputContainer>
      <Label htmlFor="tag">分類</Label>
      <Autocomplete
        freeSolo
        value={newOption}
        options={tags}
        sx={{ width: "100%" }}
        onChange={(event, newValue) => {
          if (!newValue) return;
          if (!tags.includes(newValue)) {
            setTags([...tags, newValue]);
          }
        }}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="分類"
            onBlur={() => {
              if (newOption.length === 0) return;
              setTags(() => {
                if (tags.includes(newOption)) {
                  return [...tags];
                } else {
                  return [...tags, newOption];
                }
              });
            }}
          />
        )}
      />
    </InputContainer>
  );
};

export const AddPosts = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState<string>("");
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

    if (!title || !context || !description) return;
    const articleInfo = {
      target: "articles",
      data: {
        title,
        content: context,
        createTime: new Date(),
        updateTime: new Date(),
        author: "zzuhann",
        tag: newOption,
        description: description,
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
    setDescription("");
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
    <Stack direction="column">
      <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
        新增文章
      </Typography>
      <Title titleRef={titleRef} />
      <Tags
        tags={tags}
        setTags={setTags}
        newOption={newOption}
        setNewOption={setNewOption}
      />
      <Tiptap
        context={description}
        setContext={setDescription}
        type={"description"}
      />
      <Tiptap context={context} setContext={setContext} type={"context"} />
      <Button onClick={onSubmit} style={{ alignSelf: "flex-start" }}>
        送出
      </Button>
    </Stack>
  );
};
