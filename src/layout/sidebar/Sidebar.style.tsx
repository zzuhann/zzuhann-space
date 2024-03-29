import styled from 'styled-components';

export const SidebarColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f8f9ff;
  border-radius: 20px;
  min-height: 400px;
  max-width: 230px;
  padding: 20px 25px;
  gap: 10px;
  @media (max-width: 878px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const SidebarTitle = styled.div`
  align-self: center;
  font-size: 18px;
  font-weight: bold;
`;

export const SidebarSingleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SidebarText = styled.div`
  font-size: 16px;
  letter-spacing: 0.5px;
  align-self: center;
  text-align: center;
`;
