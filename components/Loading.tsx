import ReactLoading from "react-loading";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Loading = () => {
  return (
    <LoadingContainer>
      <ReactLoading width={64} height={64} color="#E4E7EC" type="spin" />
    </LoadingContainer>
  );
};
