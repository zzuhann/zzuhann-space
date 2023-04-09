import styled from "styled-components";

export const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 878px) {
    justify-content: center;
  }
`;

export const NumTag = styled.div`
  border-radius: 5px;
  background-color: #20538f;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #fff;
`;
