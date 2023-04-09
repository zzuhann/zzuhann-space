import styled from "styled-components";

export const AllCountContainer = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #b3b3b3;
`;

export const TagCountContainer = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: #20538f;
  padding: 5px 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const TagName = styled.div`
  color: #fff;
  letter-spacing: 0.5px;
`;

export const CountContainer = styled.div`
  border-radius: 3px;
  background-color: #fff;
  padding: 1px 6px;
  color: #20538f;
  min-width: 30px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;
