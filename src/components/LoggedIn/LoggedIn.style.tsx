import styled from "styled-components";

export const Container = styled.div`
  border: solid 3px #20538f;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
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
