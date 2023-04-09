import styled from "styled-components";

export const Container = styled.div`
  border: 2px solid #20538f;
  border-radius: 20px;
  padding: 20px 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const ImageContainer = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 100%;
  position: relative;
  overflow: hidden;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const InputStyle = styled.input`
  border: 1px #8c8c8c solid;
  border-radius: 5px;
  padding: 5px;
`;

export const TextAreaStyle = styled.textarea`
  padding: 10px;
  font-size: 14px;
`;
