import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { RowContainer } from "../Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Label, TextInput } from "./AddPosts.style";

const InputContainer = styled(RowContainer)`
  align-items: center;
  margin-bottom: 24px;
`;

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
