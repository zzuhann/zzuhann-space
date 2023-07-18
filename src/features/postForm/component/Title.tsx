import { RefObject } from 'react';
import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const Label = styled.label`
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

export const Title = ({ titleRef }: { titleRef: RefObject<HTMLInputElement> }) => {
  return (
    <InputContainer>
      <Label htmlFor="title">標題</Label>
      <TextInput id="title" type="text" name="title" ref={titleRef} />
    </InputContainer>
  );
};
