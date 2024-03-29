import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { PersonalLink, PERSONAL_LINK } from '@/common/constant';
import { SidebarSingleContainer, SidebarText, SidebarTitle } from '../Sidebar.style';
import { Avatar, IconContainer } from './Profile.style';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/router';

export const Profile = () => {
  const { author, user } = useStore();
  const router = useRouter();

  const navigateToMyPage = () => {
    if (user.isLoggedIn) {
      router.push('/my/articles');
    }
  };

  return (
    <SidebarSingleContainer>
      <Avatar alt="" src={author?.userImg || ''} width="100" height="100" onClick={navigateToMyPage} />
      <SidebarTitle>{author?.userName}</SidebarTitle>
      <SidebarText>{author?.userIntro}</SidebarText>
      <IconContainer>
        <a href={PersonalLink[PERSONAL_LINK['GITHUB']]} target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </a>
        <a href={PersonalLink[PERSONAL_LINK['LINKEDIN']]} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
        <a href={`mailto:${PersonalLink[PERSONAL_LINK['LINKEDIN']]}`}>
          <EmailIcon />
        </a>
      </IconContainer>
    </SidebarSingleContainer>
  );
};
