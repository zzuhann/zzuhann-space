import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 120px;
  max-width: 1000px;
  margin-bottom: 60px;
  @media (max-width: 1080px) {
    max-width: 800px;
  }
  @media (max-width: 878px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    padding: 0 30px;
  }
`;

export const LeftSideContainer = styled.div`
  flex: 1;
  /* max-width: 800px; */
  margin: 0 auto;
  position: relative;
  margin-right: 80px;
  @media (max-width: 878px) {
    width: 100%;
  }
`;
