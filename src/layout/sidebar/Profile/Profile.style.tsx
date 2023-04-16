import styled from "styled-components";
import Image from "next/image";

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Avatar = styled(Image)`
  border-radius: 50%;
  align-self: center;
  width: 120px;
  height: 120px;
`;
