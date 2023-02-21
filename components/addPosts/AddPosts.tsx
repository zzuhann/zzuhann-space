import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { RowContainer } from "../Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export const Title = ({
  titleRef,
}: {
  titleRef: RefObject<HTMLInputElement>;
}) => {
  return (
    <RowContainer>
      <label htmlFor="title">標題</label>
      <input id="title" type="text" name="title" ref={titleRef} />
    </RowContainer>
  );
};

export const Tags = ({
  tags,
  setTags,
  newOption,
  setNewOption,
  defaultTag,
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

  console.log(newOption);

  return (
    <Autocomplete
      freeSolo
      value={newOption}
      options={tags}
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
          label="Options"
          onBlur={() => {
            if (newOption.length === 0) return;
            setTags([...tags, newOption]);
          }}
        />
      )}
    />
  );
};

export const Button = styled.div`
  border: solid 1px black;
`;
