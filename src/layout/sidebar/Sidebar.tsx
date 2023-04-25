import { Category } from './Category';
import { Latest } from './Latest';
import { Profile } from './Profile';
import { SidebarColumnContainer } from './Sidebar.style';

export const Sidebar = () => {
  return (
    <SidebarColumnContainer>
      <Profile />
      <Latest />
      <Category />
    </SidebarColumnContainer>
  );
};
