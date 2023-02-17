import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { RowContainer } from "../Container";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
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

export const Button = styled.div`
  border: solid 1px black;
`;
