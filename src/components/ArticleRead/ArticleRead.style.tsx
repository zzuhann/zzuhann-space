import styled from "styled-components";

export const ArticlePreviewContainer = styled.div<{ isLast: boolean }>`
  display: flex;
  flex-direction: column;
  border-bottom: ${(props) => (props.isLast ? "" : "1px #b3b3b3 solid")};
  margin-bottom: 55px;
  padding-bottom: 30px;
`;

export const RowCenterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const ArticleTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
  @media (max-width: 423px) {
    font-size: 22px;
  }
`;
export const SubDescription = styled.div`
  font-size: 14px;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

export const Context = styled.div`
  line-height: 1.8;
  margin-bottom: 30px;
`;
