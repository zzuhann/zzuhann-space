import { Autocomplete, TextField } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

export const Label = styled.label`
  width: 80px;
  letter-spacing: 0.5px;
  font-size: 18px;
  font-weight: bold;
`;

export const InputTitle = styled.div`
  width: 80px;
  letter-spacing: 0.5px;
  font-size: 18px;
  font-weight: bold;
`;

export const TextInput = styled.input`
  border-radius: 3px;
  border: 1px solid #b3b3b3;
  height: 55px;
  width: 100%;
  padding: 5px 10px;
  font-size: 18px;
  letter-spacing: 0.5px;
`;
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

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
        sx={{ width: '100%' }}
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
